package com.manish.gaming_backend.Controller;


import com.manish.gaming_backend.Request.GoogleAuthRequest;
import com.manish.gaming_backend.Request.RoleUpdateRequest;
import com.manish.gaming_backend.Response.*;
import com.manish.gaming_backend.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1/auth")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse<?>> googleLogin(@Valid @RequestBody GoogleAuthRequest request) {
        return new ResponseEntity<>(userService.googleLogin(request.getIdToken()), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/role")
    public ResponseEntity<ApiResponse<?>> updateRole(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody RoleUpdateRequest request) {
        return new ResponseEntity<>(userService.updateRole(userDetails.getUsername(), request.getRole()), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<?>> profile(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(userService.getProfile(userDetails.getUsername()),HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<ApiResponse<?>> deleteAccount(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(userService.deleteAccount(userDetails.getUsername()),HttpStatus.OK);
    }



}
