package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Review;
import com.manish.gaming_backend.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private ReviewRepository  reviewRepository;
    @Override
    public boolean isReviewExist(Long userId, Long productId) {
        return reviewRepository.isReviewExist(userId , productId)!=null;

    }

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public boolean deleteReviewByAdmin(Long reviewId, Long adminId) {
        try {
            reviewRepository.deleteReviewByAdmin(reviewId, adminId);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public boolean deleteReviewByUser(Long reviewId, Long userId) {
        try {
            reviewRepository.deleteReviewByUser(reviewId, userId);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    public List<Review> getReviewById(Long productId){
       return reviewRepository.findReviewById(productId);
    }



}
