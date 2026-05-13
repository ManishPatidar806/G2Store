package com.manish.gaming_backend.Config.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class config {

    private final JwtCustomFilter jwtCustomFilter;

    @Value("${security.public-urls:/v1/auth/google}")
    private String[] publicUrls;

    public config(JwtCustomFilter jwtCustomFilter) {
        this.jwtCustomFilter = jwtCustomFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return  new BCryptPasswordEncoder(12);
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      return  http.csrf(AbstractHttpConfigurer::disable)
              .sessionManagement(
                      session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
              .exceptionHandling(ex->ex.authenticationEntryPoint(
                      ((request, response, authException) ->
                      {
                          response.setStatus(401);
                          response.setContentType("application/json");
                          response.getWriter().write("{\"error\":\"Unauthorized\"}");
                      })
              ))
              .headers(headers -> headers
                      .frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
                      .xssProtection(HeadersConfigurer.XXssConfig::disable)
                      .contentTypeOptions(HeadersConfigurer.ContentTypeOptionsConfig::disable))

                  .authorizeHttpRequests(
                    auth->auth
                        .requestMatchers(publicUrls).permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtCustomFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }

}
