package com.manish.gaming_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.manish.gaming_backend.Model.OrderStatus;
import com.manish.gaming_backend.Model.User;

import java.util.List;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus , Long> {
    OrderStatus findByName(String name);

   List<OrderStatus> findByUser(User user); 
}
