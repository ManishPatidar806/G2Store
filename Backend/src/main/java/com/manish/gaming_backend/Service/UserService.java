package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Response.AuthPayload;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.ProfileResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {


     ApiResponse<AuthPayload> googleLogin(String idToken);
     ApiResponse<AuthPayload> updateRole(String email, String role);

     ApiResponse<ProfileResponse> getProfile(String email);

     ApiResponse<Void> deleteAccount(String email);

     User findUserByEmail(String email);

     User findAdminByEmail(String email);


}
