package com.manish.gaming_backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "order_status")
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private String name;

    private long price;

    private Long largePrice;

    private String company;

    private String image;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private com.manish.gaming_backend.Utils.OrderStatus status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
