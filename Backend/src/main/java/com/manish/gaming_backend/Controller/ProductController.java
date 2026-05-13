package com.manish.gaming_backend.Controller;
import com.manish.gaming_backend.Request.CreateProductRequest;
import com.manish.gaming_backend.Request.UpdateProduct;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Service.ProductService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<ApiResponse<?>> createProduct(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @RequestPart("data") @Valid CreateProductRequest request,
            @RequestPart("images") List<MultipartFile> images) {
        return new ResponseEntity<>(productService.createProduct(userDetails,request,images), HttpStatus.CREATED);
    }




    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/updateProduct")
    public ResponseEntity<ApiResponse<?>> updateProduct(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody UpdateProduct updateProduct) {
        return new ResponseEntity<>(
                productService.updateProduct(updateProduct.getName(), updateProduct),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/removeProduct")
    public ResponseEntity<ApiResponse<?>> removeProduct(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @RequestParam String name) {
        return new ResponseEntity<>(
                productService.deleteProduct(name),
                HttpStatus.NO_CONTENT
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getAllProducts")
    public ResponseEntity<ApiResponse<?>> getAdminAllProduct(
            @AuthenticationPrincipal CustomUserDetail userDetails) {
        return new ResponseEntity<>(
                productService.getAllProducts(),
                HttpStatus.OK
        );
    }

    @GetMapping("/allProducts")
    public ResponseEntity<ApiResponse<?>> findAllProduct() {
        return new ResponseEntity<>(
                productService.getAllProducts(),
                HttpStatus.OK
        );
    }





}
























