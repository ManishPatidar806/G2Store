package com.manish.gaming_backend.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;

@Slf4j
@Component
public class RequestResponseLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip logging for health checks and actuator
        if (shouldSkipLogging(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(request);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

        long startTime = System.currentTimeMillis();

        try {
            filterChain.doFilter(requestWrapper, responseWrapper);
        } finally {
            long duration = System.currentTimeMillis() - startTime;
            
            logRequest(requestWrapper);
            logResponse(responseWrapper, duration);
            
            // Copy response data back to original response
            responseWrapper.copyToResponse();
        }
    }

    private void logRequest(ContentCachingRequestWrapper request) {
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String queryString = request.getQueryString();
        
        StringBuilder sb = new StringBuilder();
        sb.append("\n=== REQUEST ===\n");
        sb.append("Method: ").append(method).append("\n");
        sb.append("URI: ").append(uri);
        
        if (queryString != null) {
            sb.append("?").append(queryString);
        }
        sb.append("\n");
        
        // Log headers
        sb.append("Headers: ");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            sb.append(headerName).append("=").append(headerValue).append("; ");
        }
        sb.append("\n");
        
        // Log body for POST/PUT/PATCH
        if ("POST".equals(method) || "PUT".equals(method) || "PATCH".equals(method)) {
            byte[] content = request.getContentAsByteArray();
            if (content.length > 0) {
                String body = new String(content, StandardCharsets.UTF_8);
                sb.append("Body: ").append(body).append("\n");
            }
        }
        
        sb.append("Client IP: ").append(getClientIP(request)).append("\n");
        
        log.info(sb.toString());
    }

    private void logResponse(ContentCachingResponseWrapper response, long duration) {
        int status = response.getStatus();
        
        StringBuilder sb = new StringBuilder();
        sb.append("=== RESPONSE ===\n");
        sb.append("Status: ").append(status).append("\n");
        sb.append("Duration: ").append(duration).append("ms\n");
        
        // Log headers
        sb.append("Headers: ");
        response.getHeaderNames().forEach(headerName -> 
            sb.append(headerName).append("=").append(response.getHeader(headerName)).append("; ")
        );
        sb.append("\n");
        
        // Log body
        byte[] content = response.getContentAsByteArray();
        if (content.length > 0 && isJsonResponse(response)) {
            String body = new String(content, StandardCharsets.UTF_8);
            sb.append("Body: ").append(body).append("\n");
        }
        
        if (status >= 400) {
            log.warn(sb.toString());
        } else {
            log.info(sb.toString());
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    private boolean isJsonResponse(HttpServletResponse response) {
        String contentType = response.getContentType();
        return contentType != null && contentType.contains("application/json");
    }

    private boolean shouldSkipLogging(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return uri.startsWith("/actuator") || uri.startsWith("/health");
    }

}
