package com.manish.gaming_backend.Controller;

import com.manish.gaming_backend.Exception.DuplicateResourceException;
import com.manish.gaming_backend.Exception.ResourceNotFoundException;
import com.manish.gaming_backend.Exception.ValidationException;
import com.manish.gaming_backend.Model.Cart;
import com.manish.gaming_backend.Model.Product;
import com.manish.gaming_backend.Model.ProductImage;
import com.manish.gaming_backend.Response.CartResponseDTO;
import com.manish.gaming_backend.Response.ApiResponse;
import com.manish.gaming_backend.Service.CartService;
import com.manish.gaming_backend.Service.ProductService;
import com.manish.gaming_backend.Service.userDetails.CustomUserDetail;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@RestController
@RequestMapping("/v1/cartItem")
public class CartController {

    private final CartService cartService;
    private final ProductService productService;

    public CartController(CartService cartService, ProductService productService) {
        this.cartService = cartService;
        this.productService = productService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/addToCart")
    public ResponseEntity<ApiResponse<?>> addProductToCart(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @Valid @RequestBody Product product) {
        Product currentProduct = productService.getProductById(product.getId());

        if (cartService.isExistInCart(currentProduct.getName(), userDetails.getUser().getId())) {
            throw new DuplicateResourceException("Product is already in cart");
        }

        Cart cart = new Cart();
        cart.setProduct(currentProduct);
        cart.setQuantity(1);
        cart.setUser(userDetails.getUser());
        cartService.AddCart(cart);

        return new ResponseEntity<>(
                ApiResponse.success("Product added to cart successfully"),
                HttpStatus.CREATED
        );
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/removeFromCart")
    public ResponseEntity<ApiResponse<?>> removeProductFromCart(
            @AuthenticationPrincipal CustomUserDetail userDetails,
            @NotBlank(message = "Product name is required") @RequestParam String productName) {
        
        if (!cartService.isExistInCart(productName, userDetails.getUser().getId())) {
            throw new ResourceNotFoundException("Product not found in cart");
        }

        cartService.deleteCart(productName, userDetails.getUser().getId());

        return new ResponseEntity<>(
                ApiResponse.success("Product removed from cart successfully"),
                HttpStatus.NO_CONTENT
        );
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/allCartItem")
    public ResponseEntity<ApiResponse<?>> getAllCartItems(@AuthenticationPrincipal CustomUserDetail userDetails) {
        
        List<Cart> cartItems = cartService.showAllCart(userDetails.getUser().getId());
        List<CartResponseDTO> cartResponseDTOS = cartItems.stream()
            .map(this::convertToDTO)
            .toList();

        return new ResponseEntity<>(
            ApiResponse.success("Cart items retrieved successfully", cartResponseDTOS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("/removeAllCart")
    public ResponseEntity<ApiResponse<?>> removeAllCartItems(@AuthenticationPrincipal CustomUserDetail userDetails) {
        
        boolean result = cartService.removeAllItemFromCart(userDetails.getUser().getId());
        if (!result) {
            throw new ValidationException("Failed to remove cart items");
        }

        return new ResponseEntity<>(
                ApiResponse.success("All cart items removed successfully"),
                HttpStatus.NO_CONTENT
        );
    }

    private CartResponseDTO convertToDTO(Cart cart) {
        Product product = cart.getProduct();
        String imageUrl = null;
        if (product != null && product.getImages() != null && !product.getImages().isEmpty()) {
            ProductImage firstImage = product.getImages().get(0);
            imageUrl = firstImage != null ? firstImage.getImageUrl() : null;
        }

        return CartResponseDTO.builder()
                .id(cart.getId())
                .productId(product != null ? product.getId() : null)
                .productName(product != null ? product.getName() : null)
                .quantity(cart.getQuantity())
                .price(product != null && product.getPrice() != null ? product.getPrice().doubleValue() : null)
                .imageUrl(imageUrl)
                .build();
    }
}

