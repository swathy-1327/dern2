package com.dern.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notification_events")
public class NotificationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientUserId;
    private String recipientRole;
    private String title;
    private String message;
    private Double latitude;
    private Double longitude;
    private Boolean isRead;
    private LocalDateTime createdAt;

    public NotificationEvent() {
    }

    public Long getId() { return id; }
    public Long getRecipientUserId() { return recipientUserId; }
    public String getRecipientRole() { return recipientRole; }
    public String getTitle() { return title; }
    public String getMessage() { return message; }
    public Double getLatitude() { return latitude; }
    public Double getLongitude() { return longitude; }
    public Boolean getIsRead() { return isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setRecipientUserId(Long recipientUserId) { this.recipientUserId = recipientUserId; }
    public void setRecipientRole(String recipientRole) { this.recipientRole = recipientRole; }
    public void setTitle(String title) { this.title = title; }
    public void setMessage(String message) { this.message = message; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}