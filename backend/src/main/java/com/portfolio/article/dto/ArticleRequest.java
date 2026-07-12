package com.portfolio.article.dto;

import jakarta.validation.constraints.NotBlank;

public record ArticleRequest(
        @NotBlank(message = "Title is required") String title,
        String titleFr,
        String excerpt,
        String excerptFr,
        String contentHtml,
        String contentHtmlFr,
        String coverImageUrl,
        String category,
        String tags,
        boolean featured,
        boolean published) {
}
