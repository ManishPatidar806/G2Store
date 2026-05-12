package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Request.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Value("${Stripe.secret.key}")
    private String secreatKey;

    @Value("${Frontend.URl}")
    private String frontEndUrl;

    public Session payment(PaymentRequest paymentRequest) throws StripeException {
        Stripe.apiKey = secreatKey;

        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for (PaymentRequest.ProductPaymentRequest product : paymentRequest.getProductPaymentRequestList()) {
            SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                    .setName(product.getName() + " (ID: " + product.getProductId().toString() + ")").build();

            SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                    .setCurrency("INR")
                    .setUnitAmount(product.getAmount() * 100)   //For 1rs =100cint
                    .setProductData(productData)
                    .build();
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setPriceData(priceData)
                    .setQuantity(1L)
                    .build();

            lineItems.add(lineItem);
        }
        SessionCreateParams params  =SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontEndUrl+"/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontEndUrl+"/failed")
                .addAllLineItem(lineItems)
                .build();

        return Session.create(params);
    }


}
