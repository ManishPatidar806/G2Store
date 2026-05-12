package com.manish.gaming_backend.Request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NonNull;

@Data
public class UpdateProduct {

    @NotBlank(message = "Name must be present ")
    private String name;
    @NotBlank(message = "Description must be present")
    private String description;
    @NotNull(message = "Price must be present")
    @Min(value = 0, message = "Price must be greater than or equal to 0")
    private double price;
    @NotNull(message = "Large price must be present")
    @Min(value = 0, message = "Large price must be greater than or equal to 0")
    private double largePrice;

    @NotBlank(message = "Processer must be present")
    private String processer;
    @NotBlank(message = "Type of product must be present")
    private String typeOfProduct;
    @NotBlank(message = "Graphic card must be present")
    private String graphicCard;
    @NotBlank(message = "Ram must be present")
    private String ram;
    @NotBlank(message = "Memory must be present")
    private String memory;
}
