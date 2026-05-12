package com.manish.gaming_backend.Repository;

import com.manish.gaming_backend.Model.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review , Long> {


    @Query("SELECT r FROM Review r where  r.product.id=:productId")
    List<Review> findReviewById(@Param("productId") Long productId);

    @Query("SELECT r FROM Review r where r.user.id=:userId And r.product.id=:productId")
    Review isReviewExist(@Param("userId") Long userId , @Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE  FROM Review r where r.id=:reviewId And  r.product.admin.id =:adminId")
    void deleteReviewByAdmin(@Param("reviewId") Long reviewId ,@Param("adminId") Long adminId);

    @Modifying
    @Transactional
    @Query("DELETE  FROM Review r where r.id=:reviewId And  r.user.id=:userId")
    void deleteReviewByUser(@Param("reviewId") Long reviewId ,@Param("userId") Long userId);



}
