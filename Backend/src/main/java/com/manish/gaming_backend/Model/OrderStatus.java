package com.manish.gaming_backend.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(
        name = "order_status",
        indexes = {
                @Index(name = "idx_order_status_user_id", columnList = "user_id"),
                @Index(name = "idx_order_status_status", columnList = "status"),
                @Index(name = "idx_order_status_date", columnList = "date")
        }
)
public class OrderStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal largePrice;

    @Column(length = 120)
    private String company;

    @Column(length = 1024)
    private String image;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private com.manish.gaming_backend.Utils.OrderStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
