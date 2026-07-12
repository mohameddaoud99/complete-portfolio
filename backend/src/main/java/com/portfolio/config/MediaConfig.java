package com.portfolio.config;

import java.nio.file.Path;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MediaConfig implements WebMvcConfigurer {

    private final MediaProperties mediaProperties;

    public MediaConfig(MediaProperties mediaProperties) {
        this.mediaProperties = mediaProperties;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = Path.of(mediaProperties.uploadDir()).toAbsolutePath().toUri().toString();
        registry.addResourceHandler(mediaProperties.publicPath() + "/**")
                .addResourceLocations(location);
    }
}
