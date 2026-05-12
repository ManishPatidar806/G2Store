package com.manish.gaming_backend.Config.security;

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

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class config {

    private final JwtCustomFilter jwtCustomFilter;

    public final String[] PUBLIC_URLS ={
            "/v1/auth/google"
    };

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

                  .authorizeHttpRequests(
                    auth->auth
                        .requestMatchers(PUBLIC_URLS).permitAll()
                        .anyRequest().authenticated())
                .addFilterBefore(jwtCustomFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }

}
