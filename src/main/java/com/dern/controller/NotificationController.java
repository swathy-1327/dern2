package com.dern.controller;

import com.dern.model.NotificationEvent;
import com.dern.repository.NotificationEventRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationEventRepository notificationEventRepository;

    public NotificationController(NotificationEventRepository notificationEventRepository) {
        this.notificationEventRepository = notificationEventRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyNotifications(HttpSession session) {
        Object userIdObj = session.getAttribute("userId");
        Object roleObj = session.getAttribute("userRole");

        if (userIdObj == null || roleObj == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Login required"));
        }

        Long userId = Long.valueOf(userIdObj.toString());
        String role = roleObj.toString();

        List<NotificationEvent> results = new ArrayList<>();
        results.addAll(notificationEventRepository.findByRecipientUserIdOrderByCreatedAtDesc(userId));

        if ("VOLUNTEER".equals(role)) {
            results.addAll(notificationEventRepository.findByRecipientRoleOrderByCreatedAtDesc("VOLUNTEER"));
        }

        results.sort(Comparator.comparing(NotificationEvent::getCreatedAt).reversed());

        return ResponseEntity.ok(results);
    }
}