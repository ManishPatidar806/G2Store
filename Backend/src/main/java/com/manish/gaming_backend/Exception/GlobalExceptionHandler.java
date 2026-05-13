package com.manish.gaming_backend.Exception;

import com.manish.gaming_backend.Response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.stream.Collectors;

@Slf4j
@Component
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFound(ResourceNotFoundException exception) {
        log.warn("ResourceNotFoundException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 404, "Resource not found"),
                HttpStatusCode.valueOf(404)
        );
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<?>> handleDuplicateResource(DuplicateResourceException exception) {
        log.warn("DuplicateResourceException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 409, "Resource already exists"),
                HttpStatusCode.valueOf(409)
        );
    }

    @ExceptionHandler(InvalidAccessException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidAccess(InvalidAccessException exception) {
        log.warn("InvalidAccessException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 403, "Access denied"),
                HttpStatusCode.valueOf(403)
        );
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationException(ValidationException exception) {
        log.warn("ValidationException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 400, "Validation failed"),
                HttpStatusCode.valueOf(400)
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<?>> handleAccessDenied(AccessDeniedException exception) {
        log.warn("AccessDeniedException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error("Access denied", 403, "You do not have permission to access this resource"),
                HttpStatusCode.valueOf(403)
        );
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ApiResponse<?>> handleUserAlreadyException(AlreadyExistsException exception) {
        log.warn("AlreadyExistsException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 400, "User has already account"),
                HttpStatusCode.valueOf(400)
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentialsException(BadCredentialsException exception) {
        log.warn("BadCredentialsException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 401, "Email and password must be Correct"),
                HttpStatusCode.valueOf(401)
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUserNotFound(UserNotFoundException exception) {
        log.warn("UserNotFoundException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 404, "User not found"),
                HttpStatusCode.valueOf(404)
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationErrors(MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        log.warn("Validation failed: {}", message);
        return new ResponseEntity<>(
                ApiResponse.error(message, 400, "Validation failed"),
                HttpStatusCode.valueOf(400)
        );
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNoHandlerFound(NoHandlerFoundException exception) {
        log.warn("NoHandlerFoundException: {}", exception.getRequestURL());
        return new ResponseEntity<>(
                ApiResponse.error("Resource not found", 404, "The requested resource was not found"),
                HttpStatusCode.valueOf(404)
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<?>> handleIllegalArgument(IllegalArgumentException exception) {
        log.error("IllegalArgumentException: {}", exception.getMessage());
        return new ResponseEntity<>(
                ApiResponse.error(exception.getMessage(), 400, "Invalid argument"),
                HttpStatusCode.valueOf(400)
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<?>> handleRuntimeException(RuntimeException exception) {
        log.error("RuntimeException occurred: ", exception);
        return new ResponseEntity<>(
                ApiResponse.error("An unexpected error occurred", 500, "Internal server error"),
                HttpStatusCode.valueOf(500)
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGlobalException(Exception exception) {
        log.error("Global exception handler caught unexpected error: ", exception);
        return new ResponseEntity<>(
                ApiResponse.error("An error occurred while processing your request", 500, "Server error"),
                HttpStatusCode.valueOf(500)
        );
    }

}

