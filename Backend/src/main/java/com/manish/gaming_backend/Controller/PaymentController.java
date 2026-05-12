package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Config.security.Security;
import com.manish.gaming_backend.Request.PaymentRequest;
import com.manish.gaming_backend.Response.PaymentResponse;
import com.manish.gaming_backend.Service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.LineItemCollection;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${Stripe.secret.key}")
    private String secretKey;

    @Autowired
    private Security security;

    @PostMapping("/v2/stripe")
    public ResponseEntity<PaymentResponse>paymentService(@RequestHeader("Authorization") String token, @Valid @RequestBody PaymentRequest paymentRequest){
       PaymentResponse response = new PaymentResponse();
        try {
            if (!security.validateToken(token)) {
                throw new Exception("UnAuthorized Access");
            }
            String role = security.extractRole(token);
            if (role.equalsIgnoreCase("ADMIN")) {
                throw new Exception("Invalid Access");
            }
            Session session = paymentService.payment(paymentRequest);
            if(session==null){
                throw new Exception("Session not found");
            }
            response.setMessage("Payment Successfully");
            response.setStatus(true);
            response.setSession(session.getId());
            response.setUrl(session.getUrl());
        return new ResponseEntity<>(response ,HttpStatus.OK);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response ,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    @GetMapping("/detail/session")
    public ResponseEntity<?> getSessionDetails(@RequestHeader("Authorization") String token, @RequestParam String sessionId) throws Exception {
    try{
        if (!security.validateToken(token)) {
            throw new Exception("UnAuthorized Access");
        }
        Stripe.apiKey = secretKey;
        Session session = Session.retrieve(sessionId);
       LineItemCollection itemCollection=  session.listLineItems();

       List<PaymentRequest.ProductPaymentRequest> productPayment=new ArrayList<>();
       int size =  itemCollection.getData().size();
       for(int i=0;i<size;i++){
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

        return ResponseEntity.ok(paymentRequest);
    } catch (StripeException e) {
        return ResponseEntity.status(500).body("Error retrieving session from Stripe: " + e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(500).body("An error occurred: " + e.getMessage());
    }
    }



}
