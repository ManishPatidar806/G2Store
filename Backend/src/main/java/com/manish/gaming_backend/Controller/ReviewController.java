package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Exception.DuplicateResourceException;
import com.manish.gaming_backend.Exception.ResourceNotFoundException;
import com.manish.gaming_backend.Request.ReviewRequest;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.Review;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.ReviewResponseDTO;
import com.manish.gaming_backend.Service.ProductService;
import com.manish.gaming_backend.Service.ReviewService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import com.manish.gaming_backend.Utils.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/v1/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ProductService productService;

    public ReviewController(ReviewService reviewService, ProductService productService) {
        this.reviewService = reviewService;
        this.productService = productService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/addReview")
    public ResponseEntity<ApiResponse<?>> addReview(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody ReviewRequest reviewRequest,
            @RequestParam Long productId) {
        Product product = productService.getProductById(productId);

        if (reviewService.isReviewExist(userDetails.getUser().getId(), productId)) {
            throw new DuplicateResourceException("You have already reviewed this product");
        }

        Review review = new Review();
        review.setUser(userDetails.getUser());
        review.setProduct(product);
        review.setDate(LocalDate.now());
        review.setName(userDetails.getUser().getName());
        review.setStar(reviewRequest.getStar());
        review.setComment(reviewRequest.getComment());

        reviewService.saveReview(review);

        return new ResponseEntity<>(
                ApiResponse.success("Review added successfully"),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasRole('USER')")
    @PutMapping("/updateReview")
    public ResponseEntity<ApiResponse<?>> updateReview(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody ReviewRequest reviewRequest,
            @RequestParam Long productId) {
        Product product = productService.getProductById(productId);

        if (!reviewService.isReviewExist(userDetails.getUser().getId(), productId)) {
            throw new ResourceNotFoundException("Review not found for this product");
        }

        Review review = new Review();
        review.setUser(userDetails.getUser());
        review.setProduct(product);
        review.setDate(LocalDate.now());
        review.setName(userDetails.getUser().getName());
        review.setStar(reviewRequest.getStar());
        review.setComment(reviewRequest.getComment());

        reviewService.saveReview(review);

        return new ResponseEntity<>(
                ApiResponse.success("Review updated successfully"),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @DeleteMapping("/deleteReview")
    public ResponseEntity<ApiResponse<?>> deleteReview(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @RequestParam Long reviewId) {
        
        if (userDetails.getRole() == Role.ADMIN) {
            boolean result = reviewService.deleteReviewByAdmin(reviewId, userDetails.getUser().getId());
            if (!result) {
                throw new ResourceNotFoundException("Review not found");
            }
        } else {
            boolean result = reviewService.deleteReviewByUser(reviewId, userDetails.getUser().getId());
            if (!result) {
                throw new ResourceNotFoundException("Review not found or access denied");
            }
        }

        return new ResponseEntity<>(
                ApiResponse.success("Review deleted successfully"),
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/findReview")
    public ResponseEntity<ApiResponse<?>> getReviewsByProduct(@RequestParam Long productId) {
        List<Review> reviews = reviewService.getReviewById(productId);
        if (reviews.isEmpty()) {
            throw new ResourceNotFoundException("No reviews found for this product");
        }

        List<ReviewResponseDTO> reviewResponseDTOS = reviews.stream()
                .map(this::convertToDTO)
                .toList();

        return new ResponseEntity<>(
                ApiResponse.success("Reviews retrieved successfully", reviewResponseDTOS),
                HttpStatus.OK
        );
    }

    private ReviewResponseDTO convertToDTO(Review review) {
        return ReviewResponseDTO.builder()
                .id(review.getId())
                .reviewerName(review.getName())
                .rating(review.getStar())
                .comment(review.getComment())
                .reviewDate(review.getDate())
                .build();
    }
}

