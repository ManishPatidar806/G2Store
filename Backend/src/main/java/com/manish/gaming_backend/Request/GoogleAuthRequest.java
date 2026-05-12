package com.manish.gaming_backend.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class GoogleAuthRequest {

    @NotBlank(message = "Google ID token is required")
    private String idToken;
}
