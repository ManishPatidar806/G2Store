package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Exception.AlreadyExistsException;
import com.manish.gaming_backend.Request.CreateProductRequest;
import com.manish.gaming_backend.Request.UpdateProduct;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Repository.ProductRepository;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

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
    public ApiResponse createProduct(CustomUserDetail userDetails, CreateProductRequest request, List<MultipartFile> images) {
        productRepository.findProductByName(request.getName()).ifPresent(
                product -> {
                    throw new AlreadyExistsException("Product with name " + request.getName() + " already exists.");
                }
        );
        if (!images.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Only images allowed");
        }
        if (images.size() > 5) {
            throw new IllegalArgumentException("Max 5 images allowed");
        }
        Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .largePrice(request.getLargePrice())
                .typeOfProduct(request.getTypeOfProduct())
                .company(request.getCompany())
                .admin(userDetails.getUser())
                .build();


        return null;
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
