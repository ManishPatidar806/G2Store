package com.manish.gaming_backend.Response;

import com.manish.gaming_backend.Model.Cart;
import lombok.Data;

import java.util.List;

@Data
public class CartDataResponse {
    private List<Cart> list;

    private String message;
    private boolean status;


}
