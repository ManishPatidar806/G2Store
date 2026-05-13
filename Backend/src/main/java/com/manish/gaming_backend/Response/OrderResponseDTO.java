package com.manish.gaming_backend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double totalAmount;
    private String orderStatus;
    private LocalDateTime createdAt;
}
