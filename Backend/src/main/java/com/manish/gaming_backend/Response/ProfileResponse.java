package com.manish.gaming_backend.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class ProfileResponse {
    private String name;
    private String email;
    private String role;

    private String number;


}
