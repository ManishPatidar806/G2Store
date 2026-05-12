package com.manish.gaming_backend.Controller;
import com.manish.gaming_backend.Request.CreateProductRequest;
import com.manish.gaming_backend.Request.UpdateProduct;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.CommonResponse;
import com.manish.gaming_backend.Response.ProductDataResponse;
import com.manish.gaming_backend.Service.ProductService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/v1/product")
public class ProductController {


    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/createproduct")
    public ResponseEntity<ApiResponse> createProduct(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @RequestPart("data") @Valid CreateProductRequest request,
            @RequestPart("images") List<MultipartFile> images) {
        return new ResponseEntity<>(productService.createProduct(userDetails,request,images), HttpStatus.CREATED);
    }




    @PostMapping("/updateProduct")
    public ResponseEntity<CommonResponse>updateProduct(@RequestHeader("Authorization") String token  ,@RequestBody UpdateProduct updateProduct){


    }

    @GetMapping("/removeProduct")
    public ResponseEntity<CommonResponse>removeProduct(@RequestHeader("Authorization") String token  ,@RequestParam String name){

    }

    /*
    * All Product of admin
    * */
    @GetMapping("/getAllProducts")
    public ResponseEntity<ProductDataResponse> getAdminAllProduct(@RequestHeader("Authorization") String token){

    }


    /*
    * Show All list of Product
    * */

    @GetMapping("allProducts")
    public ResponseEntity<ProductDataResponse> findAllProduct(@RequestHeader("Authorization") String token){

    }





}
























