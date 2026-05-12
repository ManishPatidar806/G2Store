package com.manish.gaming_backend.Config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * Configure Caffeine Cache Manager with multiple cache configurations
     */
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager(
                "products",
                "users",
                "reviews",
                "orders",
                "cartItems",
                "payment",
                "category"
        );
        
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .initialCapacity(100)
                .maximumSize(10000)
                .expireAfterWrite(10, TimeUnit.MINUTES)
                .recordStats());
        
        return cacheManager;
    }

    /**
     * Short-lived cache for frequently accessed data (5 minutes)
     */
    @Bean(name = "shortLiveCache")
    public Caffeine<Object, Object> shortLiveCache() {
        return Caffeine.newBuilder()
                .expireAfterWrite(5, TimeUnit.MINUTES)
                .maximumSize(5000)
                .recordStats();
    }

    /**
     * Long-lived cache for relatively static data (1 hour)
     */
    @Bean(name = "longLiveCache")
    public Caffeine<Object, Object> longLiveCache() {
        return Caffeine.newBuilder()
                .expireAfterWrite(1, TimeUnit.HOURS)
                .maximumSize(1000)
                .recordStats();
    }

    /**
     * Cache for user data (15 minutes - refreshes on updates)
     */
    @Bean(name = "userCache")
    public Caffeine<Object, Object> userCache() {
        return Caffeine.newBuilder()
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .maximumSize(2000)
                .recordStats();
    }

}
