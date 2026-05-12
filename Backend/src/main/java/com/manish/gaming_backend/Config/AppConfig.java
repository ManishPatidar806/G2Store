package com.manish.gaming_backend.Config;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.Executor;

@Configuration
public class AppConfig {

    /**
     * Configure Tomcat thread pool and compression
     */
    @Bean
    public ServletWebServerFactory servletWebServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        
        // Enable gzip compression
        factory.setCompressionMinResponseSize(1024);
        factory.addConnectorCustomizers(connector -> {
            connector.setAttribute("compression", "on");
            connector.setAttribute("compressionMinSize", "1024");
            connector.setAttribute("compressableMimeType", 
                "text/html,text/xml,text/plain,text/css,application/javascript,application/json");
            connector.setAttribute("maxThreads", 200);
            connector.setAttribute("minSpareThreads", 10);
        });
        
        return factory;
    }

    /**
     * Configure async task executor for @Async methods
     * Used for non-blocking operations like email sending, file uploads, etc.
     */
    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("GamingBackend-Async-");
        executor.setAwaitTerminationSeconds(60);
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.initialize();
        return executor;
    }

    /**
     * Configure RestTemplate with connection pooling for external API calls
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
