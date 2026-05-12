package com.manish.gaming_backend.Response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatusCode;

import java.time.LocalDateTime;


@Builder
public class ApiResponse<T> {

private String token;
private String message;
private boolean success;
private ErrorDetails error;
private T data;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    /**
     * Creates a successful response with data
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates a successful response without data
     */
    public static <T> ApiResponse<T> success(String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
// Auth Reponse
    public static <T> ApiResponse<T> success(String message,String token) {
        return ApiResponse.<T>builder()
                .success(true)
                .token(token)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> successWithToken(String message, String token, T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .token(token)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates an error response
     */
    public static <T> ApiResponse<T> error(String message, int errorCode, String details) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .error(ErrorDetails.builder()
                        .code(errorCode)
                        .details(details)
                        .build())
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Creates an error response without details
     */
    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    @Data
    @Builder
    public static class ErrorDetails {
        private int code;
        private String details;
    }

}
