package com.manish.gaming_backend.Repository;

import com.manish.gaming_backend.Model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review , Long> {

    List<Review> findByProduct_Id(Long productId);

    boolean existsByUser_IdAndProduct_Id(Long userId, Long productId);

    long deleteByIdAndProduct_Admin_Id(Long reviewId, Long adminId);

    long deleteByIdAndUser_Id(Long reviewId, Long userId);

}
