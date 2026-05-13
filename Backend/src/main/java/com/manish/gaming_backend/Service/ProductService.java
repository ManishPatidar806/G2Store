package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Request.CreateProductRequest;
import com.manish.gaming_backend.Request.UpdateProduct;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ProductService {
    ApiResponse<?> createProduct(CustomUserDetail userDetails, CreateProductRequest request, List<MultipartFile> images);

    Product getProductById(Long productId);

    ApiResponse<?> updateProduct(String productName, UpdateProduct updateProduct);

    ApiResponse<?> deleteProduct(String productName);

    ApiResponse<?> getAllProducts();
}
