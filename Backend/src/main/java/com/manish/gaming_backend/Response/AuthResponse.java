package com.manish.gaming_backend.Response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AuthResponse {
    private String message;
    private boolean status;
    private String token;

}
