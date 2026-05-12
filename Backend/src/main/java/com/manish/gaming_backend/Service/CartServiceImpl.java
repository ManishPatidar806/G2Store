package com.manish.gaming_backend.Service;

import com.manish.gaming_backend.Model.Cart;
import com.manish.gaming_backend.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart AddCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> showAllCart(Long userId){

        return cartRepository.showAllCart(userId);
    }

    @Override
    public boolean deleteCart(String name,Long userId) {
      try {
          cartRepository.deleteCartByName(name, userId);
          return true;
      }catch (Exception e){
          return false;
      }
      }
    public boolean isExistInCart(String name ,Long user_id){
        return cartRepository.findCartByName(name , user_id) != null;

    }

    @Override
    public boolean removeAllItemFromCart(long userId) {
        try {
            cartRepository.deleteAllById(userId);
            return true;
        }catch (Exception e){
            return false;
        }
        }


}
