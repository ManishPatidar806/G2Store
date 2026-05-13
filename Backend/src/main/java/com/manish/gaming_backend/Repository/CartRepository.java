package com.manish.gaming_backend.Repository;

import com.manish.gaming_backend.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    void deleteByProduct_NameAndUser_Id(String name, Long userId);

    Cart findByUser_IdAndProduct_Name(Long userId, String name);

    List<Cart> findByUser_Id(Long userId);

    void deleteByUser_Id(Long userId);

}
