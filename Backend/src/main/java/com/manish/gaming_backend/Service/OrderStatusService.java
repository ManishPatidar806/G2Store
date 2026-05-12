package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.OrderStatus;
import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Request.OrderRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderStatusService {

List<OrderStatus> findAllOrder(User user);

List<OrderStatus> findAllOrders();

OrderStatus updateOrderStatus(Long orderId, com.manish.gaming_backend.Utils.OrderStatus status);

boolean saveOrderList(List<OrderRequest> orderRequests, User user);

}
