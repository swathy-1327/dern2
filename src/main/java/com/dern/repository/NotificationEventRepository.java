package com.dern.repository;

import com.dern.model.NotificationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationEventRepository extends JpaRepository<NotificationEvent, Long> {
    List<NotificationEvent> findByRecipientUserIdOrderByCreatedAtDesc(Long recipientUserId);
    List<NotificationEvent> findByRecipientRoleOrderByCreatedAtDesc(String recipientRole);
}