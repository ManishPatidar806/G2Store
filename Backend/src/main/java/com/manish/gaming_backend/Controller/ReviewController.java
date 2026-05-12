package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Request.ReviewRequest;
import com.manish.gaming_backend.Config.security.Security;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.Review;
import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Response.CommonResponse;
import com.manish.gaming_backend.Response.ReviewResponse;
import com.manish.gaming_backend.Service.UserService;
import com.manish.gaming_backend.Service.ProductService;
import com.manish.gaming_backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/v1/review")
public class ReviewController {

    @Autowired
    private Security security;

    @Autowired
    private UserService userService;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;


    @PostMapping("/addReview")
        public ResponseEntity<CommonResponse> addReview(@RequestHeader("Authorization") String token , @Valid @RequestBody ReviewRequest reviewRequest , @RequestParam Long productId){
            CommonResponse commonResponse = new CommonResponse();
            try {
                if (!security.validateToken(token)) {
                    throw new Exception("Invalid Authorized");
                }
                String role = security.extractRole(token);
                if (role.equals("ADMIN")) {
                    throw new Exception("Invalid Access");
                }

                String email =  security.extractEmail(token);
                if(email.isEmpty()){
                    throw new Exception("User is not found");
                }
                User user = userService.findUserByEmail(email);
                if(user==null){
                    throw new Exception("User not found");
                }
                Product product = productService.getProductById(productId);
                if(product==null){
                    throw new Exception("Invalid Comment");
                }

                Review review = new Review();
                review.setUser(user);
                review.setProduct(product);
                review.setDate(LocalDate.now());
                review.setName(user.getName());
                if(review.getStar()<0||reviewRequest.getComment().isEmpty()){
                    throw new Exception("fill form properly");
                }
                review.setStar(reviewRequest.getStar());
                review.setComment(reviewRequest.getComment());
                if(reviewService.isReviewExist(user.getId() , productId)){
                    throw new Exception("Comment is already present");
                }

                Review savedReview = reviewService.saveReview(review);
                if (savedReview == null) {
                    throw new Exception("Failed to save review");
                }
                commonResponse.setMessage("Review added successfully");
                commonResponse.setStatus(true);
                return ResponseEntity.ok(commonResponse);

            }catch (Exception e){
                commonResponse.setMessage(e.getMessage());
                commonResponse.setStatus(false);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(commonResponse);
            }

        }
/*
* here we have not implement edit option in review
* */
    @PostMapping("/updateReview")
    public ResponseEntity<CommonResponse> updateReview(@RequestHeader("Authorization") String token , @Valid @RequestBody ReviewRequest reviewRequest , @RequestParam Long productId){
        CommonResponse commonResponse = new CommonResponse();
        try {
            if (!security.validateToken(token)) {
                throw new Exception("Invalid Authorized");
            }
            String role = security.extractRole(token);
            if (role.equals("ADMIN")) {
                throw new Exception("Invalid Access");
            }

            String email =  security.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("User is not found");
            }
            User user = userService.findUserByEmail(email);
            if(user==null){
                throw new Exception("User not found");
            }
            Product product = productService.getProductById(productId);
            if(product==null){
                throw new Exception("Invalid Comment");
            }

            Review review = new Review();
            review.setUser(user);
            review.setProduct(product);
            review.setDate(LocalDate.now());
            review.setName(user.getName());
            if(review.getStar()<0||reviewRequest.getComment().isEmpty()){
                throw new Exception("fill form properly");
            }
            review.setStar(reviewRequest.getStar());
            review.setComment(reviewRequest.getComment());
            if(!reviewService.isReviewExist(user.getId() , product.getId())){
                throw new Exception("Review is Not present");
            }

            Review savedReview = reviewService.saveReview(review);
            if (savedReview == null) {
                throw new Exception("Failed to save review");
            }
            commonResponse.setMessage("Review Updated successfully");
            commonResponse.setStatus(true);
            return ResponseEntity.ok(commonResponse);

        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(commonResponse);
        }

    }

    @GetMapping("/deleteReview")
    public ResponseEntity<CommonResponse> deleteReview(@RequestHeader("Authorization") String token , @RequestParam Long reviewId){
        CommonResponse commonResponse = new CommonResponse();
        try {
            if (!security.validateToken(token)) {
                throw new Exception("Invalid Authorized");
            }
                String email = security.extractEmail(token);
                if (email.isEmpty()) {
                    throw new Exception("User is not found");
                }
            String role = security.extractRole(token);

            if (role.equals("ADMIN")) {
                Admin admin = userService.findAdminByEmail(email);
                if (admin == null) {
                    throw new Exception("Admin not found");
                }
                boolean result = reviewService.deleteReviewByAdmin(reviewId, admin.getId());
                if (!result) {
                    throw new Exception("Failed to delete review");
                }
            }else {
                User user = userService.findUserByEmail(email);
                if (user == null) {
                    throw new Exception("User not found");
                }
                boolean result = reviewService.deleteReviewByUser(reviewId, user.getId());
                if (!result) {
                    throw new Exception("Failed to delete review");
                }
            }
            commonResponse.setMessage("Review Deleted successfully");
            commonResponse.setStatus(true);
            return ResponseEntity.ok(commonResponse);
        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return new ResponseEntity<>(commonResponse , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @GetMapping("/findReview")
    public ResponseEntity<ReviewResponse> getAllReview(@RequestHeader("Authorization") String token , @RequestParam Long productId){
        ReviewResponse response = new ReviewResponse();
        try {
            if(productId==null){
                throw new Exception("ProductId not found");
            }
            List<Review> review = reviewService.getReviewById(productId);
            if(review==null){
                throw new Exception("Invalid Comment");
            }
            response.setReview(review);
            response.setMessage("Reivew Loaded Successfully");
            response.setStatus(true);
            return ResponseEntity.ok(response);

        }catch (Exception e){
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

    }

}
