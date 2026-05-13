package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Config.security.Security;
import com.manish.gaming_backend.Exception.UserNotFoundException;
import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Repository.UserRepository;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.ProfileResponse;
import com.manish.gaming_backend.Response.AuthPayload;
import com.manish.gaming_backend.Utils.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collections;
import java.util.UUID;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Security security;
    private GoogleIdTokenVerifier googleIdTokenVerifier;

    @Value("${google.oauth.client-id}")
    private String googleClientId;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, Security security) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.security = security;
    }

    @jakarta.annotation.PostConstruct
    public void initGoogleVerifier() {
        this.googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(),
                GsonFactory.getDefaultInstance()
        ).setAudience(Collections.singletonList(googleClientId)).build();
    }


    @Override
    public ApiResponse<AuthPayload> googleLogin(String idToken) {
        try {
            GoogleIdToken verifiedToken = googleIdTokenVerifier.verify(idToken);
            if (verifiedToken == null) {
                throw new UserNotFoundException("Invalid Google token");
            }
            Payload payload = verifiedToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String sub = payload.getSubject();

            boolean isNewUser = false;
            User user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                isNewUser = true;
                user = User.builder()
                        .name(name != null ? name : "Google User")
                        .email(email)
                        .mobile("google_" + sub)
                        .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                        .role(Role.USER)
                        .build();
                user = userRepository.save(user);
            }

            String token = security.generateToken(user.getEmail(), String.valueOf(user.getRole()), user.getMobile());
            AuthPayload payloadResponse = AuthPayload.builder()
                    .isNewUser(isNewUser)
                    .role(String.valueOf(user.getRole()))
                    .name(user.getName())
                    .email(user.getEmail())
                    .build();
            return ApiResponse.successWithToken("Google Login Successfully", token, payloadResponse);
        } catch (Exception e) {
            log.error("Google authentication failed: {}", e.getMessage());
            throw new UserNotFoundException("Google authentication failed");
        }
    }

    @Override
    @CacheEvict(value = "users", key = "#email")
    public ApiResponse<AuthPayload> updateRole(String email, String role) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));
        user.setRole(Role.valueOf(role));
        userRepository.save(user);
        String token = security.generateToken(user.getEmail(), String.valueOf(user.getRole()), user.getMobile());
        AuthPayload payloadResponse = AuthPayload.builder()
                .isNewUser(false)
                .role(String.valueOf(user.getRole()))
                .name(user.getName())
                .email(user.getEmail())
                .build();
        return ApiResponse.successWithToken("Role updated successfully", token, payloadResponse);
    }

    @Override
    @Cacheable(value = "users", key = "#email", unless = "#result == null")
    public ApiResponse<ProfileResponse> getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Profile with this email " + email + " not found."));
        ProfileResponse profileResponse = ProfileResponse.builder()
                .name(user.getName())
                .role(String.valueOf(user.getRole()))
                .email(user.getEmail())
                .number(user.getMobile())
                .build();
        return ApiResponse.success("UserProfile Fetch Successfully", profileResponse);
    }

    @Override
    @CacheEvict(value = "users", key = "#email")
    public ApiResponse<Void> deleteAccount(String email) {
        userRepository.findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException("Account with this email " + email + " not found"));
        userRepository.deleteByEmail(email);
        return ApiResponse.<Void>success("Account Deleted Successfully");
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public User findAdminByEmail(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null || user.getRole() != Role.ADMIN) {
            return null;
        }
        return user;
    }

}
