package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Cart;
import com.manish.gaming_backend.Repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    public CartServiceImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public Cart AddCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> showAllCart(Long userId){

        return cartRepository.findByUser_Id(userId);
    }

    @Override
    public boolean deleteCart(String name, Long userId) {
      try {
          cartRepository.deleteByProduct_NameAndUser_Id(name, userId);
          return true;
      }catch (Exception e){
          return false;
      }
      }
    public boolean isExistInCart(String name , Long userId){
        return cartRepository.findByUser_IdAndProduct_Name(userId, name) != null;

    }

    @Override
    public boolean removeAllItemFromCart(Long userId) {
        try {
            cartRepository.deleteByUser_Id(userId);
            return true;
        }catch (Exception e){
            return false;
        }
        }


}
