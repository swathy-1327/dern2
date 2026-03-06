package com.dern.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String description;
    private Double latitude;
    private Double longitude;
    private Integer severity;
    private String numberPlate;
    private LocalDateTime createdAt;
    private String aiStatus;
    private String aiConfidence;
    private String aiSeverityEstimate;

    public Report() {
    }

    public Report(String type, String description, Double latitude, Double longitude, Integer severity, String numberPlate, LocalDateTime createdAt) {
        this.type = type;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
        this.severity = severity;
        this.numberPlate = numberPlate;
        this.createdAt = createdAt;
    }
    public String getAiStatus() {
        return aiStatus;
    }

    public void setAiStatus(String aiStatus) {
        this.aiStatus = aiStatus;
    }

    public String getAiConfidence() {
        return aiConfidence;
    }

    public void setAiConfidence(String aiConfidence) {
        this.aiConfidence = aiConfidence;
    }

    public String getAiSeverityEstimate() {
        return aiSeverityEstimate;
    }

    public void setAiSeverityEstimate(String aiSeverityEstimate) {
        this.aiSeverityEstimate = aiSeverityEstimate;
    }
    public Long getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Integer getSeverity() {
        return severity;
    }

    public String getNumberPlate() {
        return numberPlate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public void setSeverity(Integer severity) {
        this.severity = severity;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
