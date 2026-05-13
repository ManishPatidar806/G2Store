package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Review;
import com.manish.gaming_backend.Repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public boolean isReviewExist(Long userId, Long productId) {
        return reviewRepository.existsByUser_IdAndProduct_Id(userId, productId);

    }

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public boolean deleteReviewByAdmin(Long reviewId, Long adminId) {
        try {
            return reviewRepository.deleteByIdAndProduct_Admin_Id(reviewId, adminId) > 0;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public boolean deleteReviewByUser(Long reviewId, Long userId) {
        try {
            return reviewRepository.deleteByIdAndUser_Id(reviewId, userId) > 0;
        }catch (Exception e){
            return false;
        }

    }

     public List<Review> getReviewById(Long productId){
       return reviewRepository.findByProduct_Id(productId);
    }



}
