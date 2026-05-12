package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Response.ApiResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


     ApiResponse googleLogin(String idToken);
     ApiResponse updateRole(String email, String role);

     ApiResponse getProfile(String email);

     ApiResponse deleteAccount(String email);



}
