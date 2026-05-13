package com.manish.gaming_backend.Request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
    private BigDecimal price;

    @NotBlank(message = "Type of product is required")
    private String typeOfProduct;

    @NotBlank(message = "Company name is required")
    private String company;

    @NotNull(message = "Large price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal largePrice;

    // System Requirements
    @NotBlank(message = "Processor is required")
    private String processor;

    @NotBlank(message = "Graphic card is required")
    private String graphicCard;

    @NotBlank(message = "RAM is required")
    private String ram;

    @NotBlank(message = "Memory is required")
    private String memory;
}