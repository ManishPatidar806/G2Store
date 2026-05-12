package com.manish.gaming_backend.Config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Component
public class JwtCustomFilter extends OncePerRequestFilter {


    private final Security security;
    private final CustomUserDetailService customUserDetailService;

    public JwtCustomFilter(Security security, CustomUserDetailService customUserDetailService) {
        this.security = security;
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
   String authorization = request.getHeader("Authorization");
    String token  = null;
    String email=null;
    String mobile=null;
try {
    if (authorization != null && authorization.startsWith("Bearer ")) {
        token = authorization.substring(7).trim();
        email = security.extractEmail(token);
        mobile = security.extractMobile(token);
    }

    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        CustomUserDetail userDetails = (CustomUserDetail) customUserDetailService.loadUserByUsername(email);
        if (security.validateToken(token, userDetails.getUsername(), userDetails.getMobileNo())) {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
    }
    filterChain.doFilter(request, response);

}catch (Exception e){
    response.setStatus(401);
    response.setContentType("application/json");
    response.getWriter().write(
            new ObjectMapper().writeValueAsString(
                    Map.of(
                            "error", "Internal Server Error",
                            "message", "Unauthorized Access",
                            "serverMessage", e.getMessage()
                    )
            )
    );
}



    }
}
