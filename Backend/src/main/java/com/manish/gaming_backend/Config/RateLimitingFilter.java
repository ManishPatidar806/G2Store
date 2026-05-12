package com.manish.gaming_backend.Config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final String RATE_LIMIT_HEADER = "X-Rate-Limit-Remaining";
    private static final String RATE_LIMIT_RESET_HEADER = "X-Rate-Limit-Reset";
    private static final String RATE_LIMIT_LIMIT_HEADER = "X-Rate-Limit-Limit";
    
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip rate limiting for public endpoints
        String requestURI = request.getRequestURI();
        if (isPublicEndpoint(requestURI)) {
            filterChain.doFilter(request, response);
            return;
        }

        String clientId = getClientId(request);
        
        Bucket bucket = cache.computeIfAbsent(clientId, k -> createNewBucket());

        if (bucket.tryConsume(1)) {
            // Token consumed successfully
            response.addHeader(RATE_LIMIT_LIMIT_HEADER, "100");
            response.addHeader(RATE_LIMIT_HEADER, String.valueOf(bucket.estimateAbilityToConsume(1).getRoundedTokensToConsume()));
            response.addHeader(RATE_LIMIT_RESET_HEADER, String.valueOf(System.currentTimeMillis() + 60000));
            filterChain.doFilter(request, response);
        } else {
            // Rate limit exceeded
            log.warn("Rate limit exceeded for client: {}", clientId);
            response.setStatus(HttpServletResponse.SC_TOO_MANY_REQUESTS);
            response.addHeader("X-Rate-Limit-Retry-After-Seconds", "60");
            response.getWriter().write("{\"message\": \"Rate limit exceeded. Please try again later.\"}");
            response.setContentType("application/json");
        }
    }

    /**
     * Create a new bucket with rate limit configuration
     * 100 requests per minute per client
     */
    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(100, Refill.intervally(100, Duration.ofMinutes(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    /**
     * Get client identifier (IP address or user)
     */
    private String getClientId(HttpServletRequest request) {
        // Try to get user from principal if authenticated
        if (request.getUserPrincipal() != null) {
            return request.getUserPrincipal().getName();
        }

        // Fall back to client IP
        String clientIp = request.getHeader("X-Forwarded-For");
        if (clientIp == null || clientIp.isEmpty()) {
            clientIp = request.getRemoteAddr();
        }
        return clientIp;
    }

    /**
     * Check if endpoint is public and should skip rate limiting
     */
    private boolean isPublicEndpoint(String uri) {
        return uri.startsWith("/v1/auth/") || 
               uri.startsWith("/health") || 
               uri.startsWith("/actuator");
    }

}
