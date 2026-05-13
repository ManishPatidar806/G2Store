package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Exception.ResourceNotFoundException;
import com.manish.gaming_backend.Exception.ValidationException;
import com.manish.gaming_backend.Model.OrderStatus;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.ProductImage;
import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Repository.OrderStatusRepository;
import com.manish.gaming_backend.Repository.ProductRepository;
import com.manish.gaming_backend.Request.OrderRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class OrderStatusServiceImpl implements OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;
    private final ProductRepository productRepository;

    public OrderStatusServiceImpl(OrderStatusRepository orderStatusRepository, ProductRepository productRepository) {
        this.orderStatusRepository = orderStatusRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<OrderStatus> findAllOrder(User user) {
        return orderStatusRepository.findByUser(user);
    }

    @Override
    public List<OrderStatus> findAllOrders() {
        return orderStatusRepository.findAll();
    }

    @Override
    public OrderStatus updateOrderStatus(Long orderId, com.manish.gaming_backend.Utils.OrderStatus status) {
        Optional<OrderStatus> existingOrder = orderStatusRepository.findById(orderId);
        OrderStatus orderStatus = existingOrder.orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
        orderStatus.setStatus(status);
        return orderStatusRepository.save(orderStatus);
    }

    @Override
    public boolean saveOrderList(List<OrderRequest> orderRequests , User user)  {
        if (orderRequests == null || orderRequests.isEmpty()) {
            throw new ValidationException("Order list cannot be empty");
        }

        if (user == null) {
            throw new ValidationException("Authenticated user is required");
        }

        List<OrderStatus> orderStatusList = new ArrayList<>();
        for (OrderRequest orderRequest : orderRequests) {
            long id = orderRequest.getProductId();
            Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                throw new ResourceNotFoundException("Product not found with id: " + id);
            }

            Product currentProduct = product.get();
            String imageUrl = null;
            List<ProductImage> images = currentProduct.getImages();
            if (images != null && !images.isEmpty()) {
                imageUrl = images.get(0).getImageUrl();
            }

            OrderStatus status = new OrderStatus();
            status.setProductId(currentProduct.getId());
            status.setPrice(currentProduct.getPrice());
            status.setDate(LocalDate.now());
            status.setCompany(currentProduct.getCompany());
            status.setLargePrice(currentProduct.getLargePrice());
            status.setName(currentProduct.getName());
            status.setImage(imageUrl);
            status.setStatus(com.manish.gaming_backend.Utils.OrderStatus.PAYMENT_SUCCESS);
            status.setUser(user);
            orderStatusList.add(status);
        }
        orderStatusRepository.saveAll(orderStatusList);
        return true;
    }
}
