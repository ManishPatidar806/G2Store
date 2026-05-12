package com.manish.gaming_backend.Request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class PaymentRequest {

    @NotNull(message = "Payment items are required")
    @Size(min = 1, message = "At least one product is required")
    @Valid
    List<ProductPaymentRequest> productPaymentRequestList;

    public static class ProductPaymentRequest{
        @NotNull(message = "Product id is required")
        public Long productId;

        @Min(value = 1, message = "Amount must be greater than 0")
        public long amount;

        @NotBlank(message = "Product name is required")
        public String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

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
    }

    public List<ProductPaymentRequest> getProductPaymentRequestList() {
        return productPaymentRequestList;
    }

    public void setProductPaymentRequestList(List<ProductPaymentRequest> productPaymentRequestList) {
        this.productPaymentRequestList = productPaymentRequestList;
    }
}
