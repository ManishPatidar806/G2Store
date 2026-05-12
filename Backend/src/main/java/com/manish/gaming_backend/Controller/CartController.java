package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Config.security.Security;
import com.manish.gaming_backend.Model.Cart;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.User;
import com.manish.gaming_backend.Response.CommonResponse;
import com.manish.gaming_backend.Response.CartDataResponse;
import com.manish.gaming_backend.Service.UserService;
import com.manish.gaming_backend.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/v1/cartItem")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private Security security;

    @Autowired
    private UserService userService;


    @PostMapping("/addToCart")
    public ResponseEntity<CommonResponse> addProductToCart(@RequestHeader("Authorization") String token , @RequestBody Product product) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            if(!security.validateToken(token)){
                throw new Exception("Invalid Authorized");
            }
            String role =security.extractRole(token);
            if(role.equals("ADMIN")){
                throw new Exception("Invalid Access");
            }
        Cart cart = new Cart();
        cart.setName(product.getName());
        cart.setDate(LocalDate.now());
        cart.setCompanyName(product.getCompany());
        cart.setDescription(product.getDescription());
        cart.setLargePrice(product.getLargePrice());
        cart.setImage(product.getMain_Image());
        cart.setProductId(product.getId());
        cart.setPrice(product.getPrice());
            String email =  security.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("User is not found");
            }
            User user = userService.findUserByEmail(email);
            if(user==null){
                throw new Exception("User not found");
            }
            cart.setUser(user);

            if(cartService.isExistInCart(cart.getName() ,user.getId())){
                throw new Exception("Product is already in Cart");
            }
            cartService.AddCart(cart);
            commonResponse.setMessage("Successfully added product to the cart");
            commonResponse.setStatus(true);
            return new ResponseEntity<>(commonResponse, HttpStatus.OK);
        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return new ResponseEntity<>(commonResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/removeToCart")
    public ResponseEntity<CommonResponse> removeProductToCart(@RequestHeader("Authorization") String token ,@RequestParam String productName) {
        CommonResponse commonResponse = new CommonResponse();
        try {
            if(!security.validateToken(token)){
            throw new Exception("Invalid Authorized");
            }
            String role =security.extractRole(token);
            if(role.equals("ADMIN")){
                throw new Exception("Invalid Access");
            }
            String email =  security.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("User is not found");
            }
            User user = userService.findUserByEmail(email);
            if(user==null){
                throw new Exception("User not found");
            }
            if(!cartService.isExistInCart(productName ,user.getId())){
                throw new Exception("Product Not Found");
            }

            cartService.deleteCart(productName , user.getId());
            commonResponse.setMessage("Successfully removed product from the cart");
            commonResponse.setStatus(true);
            return new ResponseEntity<>(commonResponse, HttpStatus.OK);
        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return new ResponseEntity<>(commonResponse, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/allCartItem")
    public ResponseEntity<CartDataResponse> getAllCartItem(@RequestHeader("Authorization") String token ) {
        CartDataResponse dataResponse = new CartDataResponse();
        try {
                if(!security.validateToken(token)){
                    throw new Exception("Invalid Authorized");
                }
                String role =security.extractRole(token);
                if(role.equals("ADMIN")){
                    throw new Exception("Invalid Access");
                }
                String email = security.extractEmail(token);
            if (email.isEmpty()) {
                throw new Exception("User is not found");
            }
            User user = userService.findUserByEmail(email);
            if (user == null) {
                throw new Exception("User not found");
            }

            List<Cart> data = cartService.showAllCart(user.getId());
            dataResponse.setMessage("Successfully retrieved all cart items");
            dataResponse.setStatus(true);
            dataResponse.setList(data);
            return new ResponseEntity<>(dataResponse, HttpStatus.OK);
        }catch (Exception e){
            dataResponse.setMessage(e.getMessage());
            dataResponse.setStatus(false);
            return new ResponseEntity<>(dataResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/removeAllCart")
    public ResponseEntity<CommonResponse> removeAllCartItem(@RequestHeader("Authorization") String token ) {
        CommonResponse dataResponse = new CommonResponse();
        try {
            if(!security.validateToken(token)){
                throw new Exception("Invalid Authorized");
            }
            String role =security.extractRole(token);
            if(role.equals("ADMIN")){
                throw new Exception("Invalid Access");
            }
            String email = security.extractEmail(token);
            if (email.isEmpty()) {
                throw new Exception("User is not found");
            }
            User user = userService.findUserByEmail(email);
            if (user == null) {
                throw new Exception("User not found");
            }
            Long id = user.getId();
            boolean response= cartService.removeAllItemFromCart(id);
            if(!response){
                throw new Exception("Failed to remove Cart item");
            }
            dataResponse.setMessage("Remove all cart items Successfully");
            dataResponse.setStatus(true);

            return new ResponseEntity<>(dataResponse, HttpStatus.OK);
        }catch (Exception e){
            dataResponse.setMessage(e.getMessage());
            dataResponse.setStatus(false);
            return new ResponseEntity<>(dataResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
