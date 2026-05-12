package com.manish.gaming_backend.Response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthPayload {

    private boolean isNewUser;
    private String role;
    private String name;
    private String email;
}
