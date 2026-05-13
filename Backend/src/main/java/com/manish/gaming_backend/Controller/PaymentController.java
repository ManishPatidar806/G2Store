package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Exception.ValidationException;
import com.manish.gaming_backend.Request.PaymentRequest;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Response.PaymentResponseDTO;
import com.manish.gaming_backend.Service.PaymentService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import com.stripe.exception.StripeException;
import com.stripe.model.LineItemCollection;
import com.stripe.model.checkout.Session;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/payment")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/v2/stripe")
    public ResponseEntity<ApiResponse<?>> initiatePayment(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody PaymentRequest paymentRequest) throws com.stripe.exception.StripeException {
        
        if (paymentRequest.getProductPaymentRequestList() == null || 
            paymentRequest.getProductPaymentRequestList().isEmpty()) {
            throw new ValidationException("Product list cannot be empty");
        }

        Session session = paymentService.payment(paymentRequest);
        if (session == null) {
            throw new ValidationException("Failed to create payment session");
        }

        PaymentResponseDTO paymentResponse = PaymentResponseDTO.builder()
                .sessionId(session.getId())
                .checkoutUrl(session.getUrl())
                .status("PENDING")
                .build();

        return new ResponseEntity<>(
                ApiResponse.success("Payment session created successfully", paymentResponse),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/detail/session")
    public ResponseEntity<ApiResponse<?>> getSessionDetails(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @RequestParam String sessionId) {
        
        if (sessionId == null || sessionId.isEmpty()) {
            throw new ValidationException("Session ID is required");
        }

        try {
            Session session = Session.retrieve(sessionId);
            LineItemCollection itemCollection = session.listLineItems();

            List<PaymentRequest.ProductPaymentRequest> productPayment = new ArrayList<>();
            int size = itemCollection.getData().size();
            
            for (int i = 0; i < size; i++) {
                PaymentRequest.ProductPaymentRequest paymentObject = new PaymentRequest.ProductPaymentRequest();
                String name = itemCollection.getData().get(i).getDescription();
                Long price = itemCollection.getData().get(i).getAmountTotal();
                
                paymentObject.setAmount(price);
                paymentObject.setName(name.split(" \\(")[0]);
                paymentObject.setProductId(Long.parseLong((name.split("ID: ")[1].split("\\)")[0]).trim()));
                productPayment.add(paymentObject);
            }

            PaymentRequest paymentRequest = new PaymentRequest();
            paymentRequest.setProductPaymentRequestList(productPayment);

            return new ResponseEntity<>(
                    ApiResponse.success("Session details retrieved successfully", paymentRequest),
                    HttpStatus.OK
            );
        } catch (StripeException e) {
            throw new ValidationException("Error retrieving session from payment provider: " + e.getMessage());
        } catch (Exception e) {
            throw new ValidationException("Failed to retrieve session details: " + e.getMessage());
        }
    }
}

