package com.manish.gaming_backend.Config.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class Security {



    @Value("${jwt.secret}")
    private String secretKeyString;

    @Value("${jwt.expiration:86400000}")
    private long jwtExpiration;

    private Key secretKey;

    @PostConstruct
    public void init(){
        if(secretKeyString==null||secretKeyString.length()<64){
            throw new IllegalStateException("JWT secret must be at least 64 characters for HS512");
        }
        this.secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
    }


    public String generateToken(String email, String role){
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtExpiration);
        String token = Jwts.builder().setSubject(email).addClaims(Map.of("role" , role))
            .setIssuedAt(now)
            .setExpiration(expiry)
                .signWith(secretKey)
                .compact();

        return token;
    }

    public boolean validateToken(String token, String email){
        try {
            String normalizedToken = normalizeToken(token);
            if (normalizedToken == null) {
                return false;
            }
            Claims claims = extractClaims(normalizedToken);
            String tokenEmail = claims.getSubject();
            return tokenEmail.equals(email);
        } catch (ExpiredJwtException e) {
            log.info("Token expired");

        } catch (SignatureException e) {
            log.info("Invalid signature (token tampered)");
        } catch (MalformedJwtException e) {
            log.info("Invalid token format");
        } catch (IllegalArgumentException e) {
            log.info("Token is null or empty");
        } catch (Exception e) {
            log.info("Unexpected error: {} ", e.getMessage());
    }
        return false;
    }

    public boolean validateToken(String token) {
        try {
            String normalizedToken = normalizeToken(token);
            if (normalizedToken == null) {
                return false;
            }
            extractClaims(normalizedToken);
            return true;
        } catch (ExpiredJwtException e) {
            log.info("Token expired");
        } catch (SignatureException e) {
            log.info("Invalid signature (token tampered)");
        } catch (MalformedJwtException e) {
            log.info("Invalid token format");
        } catch (IllegalArgumentException e) {
            log.info("Token is null or empty");
        } catch (Exception e) {
            log.info("Unexpected error: {} ", e.getMessage());
        }
        return false;
    }
    public String extractEmail(String token)  {
        String normalizedToken = normalizeToken(token);
        if (normalizedToken == null) {
            return null;
        }
        return extractClaims(normalizedToken).getSubject();
    }
    public String extractRole(String token)  {
        String normalizedToken = normalizeToken(token);
        if (normalizedToken == null) {
            return null;
        }
        return extractClaims(normalizedToken).get("role", String.class);
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private String normalizeToken(String token) {
        if (token == null) {
            return null;
        }
        String trimmed = token.trim();
        if (trimmed.startsWith("Bearer ")) {
            return trimmed.substring(7).trim();
        }
        return trimmed.isEmpty() ? null : trimmed;
    }

}
