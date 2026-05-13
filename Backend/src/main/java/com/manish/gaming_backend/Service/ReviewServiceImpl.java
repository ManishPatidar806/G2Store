package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Review;
import com.manish.gaming_backend.Repository.ReviewRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@Service
@Validated
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public boolean isReviewExist(@NotNull Long userId, @NotNull Long productId) {
        return reviewRepository.existsByUser_IdAndProduct_Id(userId, productId);

    }

    @Override
    public Review saveReview(@Valid Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public boolean deleteReviewByAdmin(@NotNull Long reviewId, @NotNull Long adminId) {
        try {
            return reviewRepository.deleteByIdAndProduct_Admin_Id(reviewId, adminId) > 0;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public boolean deleteReviewByUser(@NotNull Long reviewId, @NotNull Long userId) {
        try {
            return reviewRepository.deleteByIdAndUser_Id(reviewId, userId) > 0;
        }catch (Exception e){
            return false;
        }

    }

     public List<Review> getReviewById(@NotNull Long productId){
       return reviewRepository.findByProduct_Id(productId);
    }



}
