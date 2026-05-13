package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Exception.ValidationException;
import com.manish.gaming_backend.Model.OrderStatus;
import com.manish.gaming_backend.Request.OrderRequest;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.OrderResponseDTO;
import com.manish.gaming_backend.Service.OrderStatusService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/order")
public class OrderStatusController {

    private final OrderStatusService orderStatusService;

    public OrderStatusController(OrderStatusService orderStatusService) {
        this.orderStatusService = orderStatusService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/getOrderList")
    public ResponseEntity<ApiResponse<?>> getUserOrders(@AuthenticationPrincipal CustomUserDetail userDetails) {
        
        List<OrderStatus> orderStatusList = orderStatusService.findAllOrder(userDetails.getUser());
        List<OrderResponseDTO> orderResponseDTOS = orderStatusList.stream()
            .map(this::convertToDTO)
            .toList();
        
        return new ResponseEntity<>(
            ApiResponse.success("Orders retrieved successfully", orderResponseDTOS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/addOrderList")
    public ResponseEntity<ApiResponse<?>> createOrders(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody List<OrderRequest> orderRequest) {
        orderStatusService.saveOrderList(orderRequest, userDetails.getUser());

        return new ResponseEntity<>(
                ApiResponse.success("Orders created successfully"),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/list")
    public ResponseEntity<ApiResponse<?>> getAllOrdersForAdmin() {
        
        List<OrderStatus> orders = orderStatusService.findAllOrders();
        List<OrderResponseDTO> orderResponseDTOS = orders.stream()
            .map(this::convertToDTO)
            .toList();
        
        return new ResponseEntity<>(
            ApiResponse.success("All orders retrieved successfully", orderResponseDTOS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/admin/status")
    public ResponseEntity<ApiResponse<?>> updateOrderStatus(
            @RequestParam Long orderId,
            @RequestParam String status) {
        if (status == null || status.isBlank()) {
            throw new ValidationException("Status is required");
        }

        com.manish.gaming_backend.Utils.OrderStatus parsedStatus;
        try {
            parsedStatus = com.manish.gaming_backend.Utils.OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid order status: " + status);
        }

        OrderStatus updated = orderStatusService.updateOrderStatus(orderId, parsedStatus);

        return new ResponseEntity<>(
                ApiResponse.success("Order status updated successfully", convertToDTO(updated)),
                HttpStatus.OK
        );
    }

    private OrderResponseDTO convertToDTO(OrderStatus orderStatus) {
        return OrderResponseDTO.builder()
                .orderId(orderStatus.getId())
                .productId(orderStatus.getProductId())
                .productName(orderStatus.getName())
                .quantity(1)
                .totalAmount(orderStatus.getPrice() != null ? orderStatus.getPrice().doubleValue() : null)
                .orderStatus(orderStatus.getStatus() != null ? orderStatus.getStatus().name() : null)
                .createdAt(orderStatus.getDate() != null ? orderStatus.getDate().atStartOfDay() : null)
                .build();
    }
}

