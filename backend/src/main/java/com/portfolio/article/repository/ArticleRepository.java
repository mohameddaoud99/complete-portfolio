package com.portfolio.article.repository;

import com.portfolio.article.entity.Article;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, UUID> {

    List<Article> findAllByOrderByCreatedAtDesc();

    List<Article> findAllByPublishedTrueOrderByPublishedAtDesc();

    Optional<Article> findBySlugAndPublishedTrue(String slug);

    boolean existsBySlug(String slug);
}
