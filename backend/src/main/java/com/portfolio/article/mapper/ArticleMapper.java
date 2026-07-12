package com.portfolio.article.mapper;

import com.portfolio.article.dto.ArticleResponse;
import com.portfolio.article.entity.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    public ArticleResponse toResponse(Article article) {
        return new ArticleResponse(
                article.getId(),
                article.getTitle(),
                article.getTitleFr(),
                article.getSlug(),
                article.getExcerpt(),
                article.getExcerptFr(),
                article.getContentHtml(),
                article.getContentHtmlFr(),
                article.getCoverImageUrl(),
                article.getCategory(),
                article.getTags(),
                article.isFeatured(),
                article.isPublished(),
                article.getPublishedAt(),
                article.getCreatedAt());
    }
}
