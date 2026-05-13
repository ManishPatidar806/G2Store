package com.manish.gaming_backend.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {
    private String sessionId;
    private String checkoutUrl;
    private String status;
    private Double amount;
    private String currency;
}
