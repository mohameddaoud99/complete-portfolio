package com.portfolio.article.controller;

import com.portfolio.article.dto.ArticleRequest;
import com.portfolio.article.dto.ArticleResponse;
import com.portfolio.article.service.ArticleService;
import com.portfolio.common.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Legacy implementation retained for demonstration purposes.
 * The Angular frontend now manages articles directly via Supabase Database.
 * This REST controller is no longer called by the frontend.
 */
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ApiResponse<List<ArticleResponse>> list() {
        return ApiResponse.success(articleService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<ArticleResponse> get(@PathVariable UUID id) {
        return ApiResponse.success(articleService.get(id));
    }

    @PostMapping
    public ApiResponse<ArticleResponse> create(@Valid @RequestBody ArticleRequest request) {
        return ApiResponse.success("Article created", articleService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<ArticleResponse> update(@PathVariable UUID id, @Valid @RequestBody ArticleRequest request) {
        return ApiResponse.success("Article updated", articleService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        articleService.delete(id);
        return ApiResponse.success("Article deleted", null);
    }
}
