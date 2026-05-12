package com.manish.gaming_backend.Repository;

import com.manish.gaming_backend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findProductByName(String name);


    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.description = :description,p.largePrice=:largePrice, p.price = :price, p.processer = :processer, p.Graphic_card = :graphicCard, p.ram = :ram, p.memory = :memory, p.typeOfProduct = :typeOfProduct WHERE p.admin.id = :adminId AND p.name = :name")
    int updateProductDetails(@Param("name") String name,
                             @Param("largePrice") double largePrice,
                             @Param("price") double price,
                             @Param("processer") String processer,
                             @Param("graphicCard") String graphicCard,
                             @Param("ram") String ram,
                             @Param("memory") String memory,
                             @Param("description") String description,
                             @Param("typeOfProduct") String typeOfProduct,
                             @Param("adminId") Long adminId);
}
