package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Request.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {
    Session payment(PaymentRequest paymentRequest) throws StripeException;
}
