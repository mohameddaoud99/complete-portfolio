package com.portfolio.message.repository;

import com.portfolio.message.entity.Message;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, UUID> {

    List<Message> findAllByOrderByCreatedAtDesc();

    long countByReadFalse();
}
