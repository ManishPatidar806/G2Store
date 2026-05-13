package com.manish.gaming_backend.Model;



import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = "product_images",
        indexes = {
                @Index(name = "idx_product_image_product_id", columnList = "product_id")
        }
)
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1024)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}