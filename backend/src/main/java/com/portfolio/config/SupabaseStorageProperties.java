package com.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.supabase.storage")
public record SupabaseStorageProperties(
        String serviceUrl,
        String serviceKey,
        String bucket) {
}
