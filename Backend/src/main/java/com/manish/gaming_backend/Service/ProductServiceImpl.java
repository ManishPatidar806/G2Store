package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Exception.AlreadyExistsException;
import com.manish.gaming_backend.Exception.ResourceNotFoundException;
import com.manish.gaming_backend.Request.CreateProductRequest;
import com.manish.gaming_backend.Request.UpdateProduct;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.ProductImage;
import com.manish.gaming_backend.Repository.ProductRepository;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.ProductResponseDTO;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

     private final ProductRepository productRepository;
     private final CloudinaryService cloudinaryService;

    public ProductServiceImpl(ProductRepository productRepository, CloudinaryService cloudinaryService) {
        this.productRepository = productRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public ApiResponse<?> createProduct(CustomUserDetail userDetails,
                                        CreateProductRequest request,
                                        List<MultipartFile> images) {
        productRepository.findProductByName(request.getName()).ifPresent(
                product -> {
                    throw new AlreadyExistsException("Product with name " + request.getName() + " already exists.");
                }
        );
        for (MultipartFile image : images) {
            if (image.getContentType() == null || !image.getContentType().startsWith("image/")) {
                throw new IllegalArgumentException("Only images allowed");
            }
        }
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .largePrice(request.getLargePrice())
                .typeOfProduct(request.getTypeOfProduct())
                .company(request.getCompany())
                .admin(userDetails.getUser())
                .build();

        List<ProductImage> productImages = new ArrayList<>();
        for (MultipartFile image : images) {
            try {
                String imageUrl = cloudinaryService.uploadImage(image);
                ProductImage productImage = new ProductImage();
                productImage.setImageUrl(imageUrl);
                productImage.setProduct(product);
                productImages.add(productImage);
            } catch (IOException e) {
                throw new IllegalStateException("Failed to upload product image: " + e.getMessage(), e);
            }
        }

        product.setImages(productImages);
        Product savedProduct = productRepository.save(product);

        return ApiResponse.success("Product created successfully", convertToDTO(savedProduct));
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
    }

    @Override
    public ApiResponse<?> updateProduct(String productName,
                                        UpdateProduct updateProduct) {
        Product existingProduct = productRepository.findProductByName(productName)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with name: " + productName));
        
        existingProduct.setName(updateProduct.getName());
        existingProduct.setDescription(updateProduct.getDescription());
        existingProduct.setPrice(updateProduct.getPrice());
        existingProduct.setLargePrice(updateProduct.getLargePrice());
        existingProduct.setTypeOfProduct(updateProduct.getTypeOfProduct());
        
        Product updatedProduct = productRepository.save(existingProduct);
        
        return ApiResponse.success("Product updated successfully", convertToDTO(updatedProduct));
    }

    @Override
    public ApiResponse<?> deleteProduct(String productName) {
        Product product = productRepository.findProductByName(productName)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with name: " + productName));
        
        productRepository.delete(product);
        
        return ApiResponse.success("Product deleted successfully");
    }

    @Override
    public ApiResponse<?> getAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new ResourceNotFoundException("No products found in database");
        }

        List<ProductResponseDTO> productDTOs = products.stream()
                .map(this::convertToDTO)
                .toList();

        return ApiResponse.success("Products retrieved successfully", productDTOs);
    }

    // Helper method to convert Product entity to ProductResponseDTO
    private ProductResponseDTO convertToDTO(Product product) {
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        BeanUtils.copyProperties(product, productResponseDTO);
        productResponseDTO.setAdminName(product.getAdmin() != null ? product.getAdmin().getName() : "Unknown");
        productResponseDTO.setImageUrls(product.getImages() != null ?
            product.getImages().stream()
                .map(ProductImage::getImageUrl)
                .toList() :
            List.of());
        productResponseDTO.setReviewCount(product.getReviews() != null ? product.getReviews().size() : 0);
        return productResponseDTO;
    }
















    /*
    * Modify in this method or FInd by Public ID
    * */


    public String extractPublicId(String secureUrl) {
        // Remove Cloudinary base URL
        String baseUrl = "https://res.cloudinary.com/"+cloudName+"/image/upload/";
        if (secureUrl.startsWith(baseUrl)) {
            String path = secureUrl.substring(baseUrl.length());

            // Remove version prefix (e.g., "v1690000000/")
            String[] parts = path.split("/");
            if (parts.length > 1 && parts[0].matches("v\\d+")) {
                path = path.substring(parts[0].length() + 1);
            }

            // Remove file extension (e.g., ".jpg", ".png")
            return path.replaceAll("\\.[a-z]+$", "");
        }
        return null;
    }



}
