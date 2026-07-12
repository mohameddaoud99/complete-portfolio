package com.portfolio.article.service;

import com.portfolio.article.dto.ArticleRequest;
import com.portfolio.article.dto.ArticleResponse;
import com.portfolio.article.entity.Article;
import com.portfolio.article.mapper.ArticleMapper;
import com.portfolio.article.repository.ArticleRepository;
import com.portfolio.common.exception.ResourceNotFoundException;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
    }

    public List<ArticleResponse> list() {
        return articleRepository.findAllByOrderByCreatedAtDesc().stream().map(articleMapper::toResponse).toList();
    }

    public List<ArticleResponse> listPublished() {
        return articleRepository.findAllByPublishedTrueOrderByPublishedAtDesc().stream()
                .map(articleMapper::toResponse).toList();
    }

    public ArticleResponse get(UUID id) {
        return articleMapper.toResponse(findOrThrow(id));
    }

    public ArticleResponse getPublishedBySlug(String slug) {
        return articleRepository.findBySlugAndPublishedTrue(slug)
                .map(articleMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + slug));
    }

    @Transactional
    public ArticleResponse create(ArticleRequest request) {
        Article article = new Article();
        article.setSlug(generateUniqueSlug(request.title()));
        applyRequest(article, request);
        return articleMapper.toResponse(articleRepository.saveAndFlush(article));
    }

    @Transactional
    public ArticleResponse update(UUID id, ArticleRequest request) {
        Article article = findOrThrow(id);
        applyRequest(article, request);
        return articleMapper.toResponse(article);
    }

    @Transactional
    public void delete(UUID id) {
        articleRepository.delete(findOrThrow(id));
    }

    private Article findOrThrow(UUID id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
    }

    private void applyRequest(Article article, ArticleRequest request) {
        article.setTitle(request.title());
        article.setTitleFr(request.titleFr());
        article.setExcerpt(request.excerpt());
        article.setExcerptFr(request.excerptFr());
        article.setContentHtml(request.contentHtml());
        article.setContentHtmlFr(request.contentHtmlFr());
        article.setCoverImageUrl(request.coverImageUrl());
        article.setCategory(request.category());
        article.setTags(request.tags());
        article.setFeatured(request.featured());
        article.setPublished(request.published());
        if (request.published() && article.getPublishedAt() == null) {
            article.setPublishedAt(Instant.now());
        } else if (!request.published()) {
            article.setPublishedAt(null);
        }
    }

    private String generateUniqueSlug(String title) {
        String base = title.toLowerCase(Locale.ROOT).trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
        String slug = base;
        int suffix = 2;
        while (articleRepository.existsBySlug(slug)) {
            slug = base + "-" + suffix++;
        }
        return slug;
    }
}
