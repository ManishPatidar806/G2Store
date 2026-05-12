package com.manish.gaming_backend.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class OrderRequest {
    @NotNull(message = "Product id is required")
    private Long productId;

    @Min(value = 1, message = "Amount must be greater than 0")
    private long amount;

    @NotBlank(message = "Product name is required")
    private String name;

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
