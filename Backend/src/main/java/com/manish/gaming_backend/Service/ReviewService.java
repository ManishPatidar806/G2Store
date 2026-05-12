package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Review;

import java.util.List;

public interface ReviewService {
    public boolean isReviewExist(Long userId , Long productId);

    public Review saveReview(Review review);

    public boolean deleteReviewByAdmin(Long reviewId  , Long adminId);

    public boolean deleteReviewByUser(Long reviewId  , Long userId);

    public List<Review> getReviewById(Long productId);

}
