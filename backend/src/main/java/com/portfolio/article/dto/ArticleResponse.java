package com.portfolio.article.dto;

import java.time.Instant;
import java.util.UUID;

public record ArticleResponse(
        UUID id,
        String title,
        String titleFr,
        String slug,
        String excerpt,
        String excerptFr,
        String contentHtml,
        String contentHtmlFr,
        String coverImageUrl,
        String category,
        String tags,
        boolean featured,
        boolean published,
        Instant publishedAt,
        Instant createdAt) {
}
