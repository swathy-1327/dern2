package com.dern.controller;

import com.dern.model.Report;
import com.dern.repository.ReportRepository;
import com.dern.repository.SosEventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final ReportRepository reportRepository;
    private final SosEventRepository sosEventRepository;

    public StatsController(ReportRepository reportRepository, SosEventRepository sosEventRepository) {
        this.reportRepository = reportRepository;
        this.sosEventRepository = sosEventRepository;
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        List<Report> reports = reportRepository.findAll();

        long totalReports = reports.size();
        long totalSos = sosEventRepository.count();
        long activeSos = sosEventRepository.findByStatus("ACTIVE").size();

        Map<String, Long> reportsByType = new HashMap<>();

        for (Report report : reports) {
            String type = report.getType();
            reportsByType.put(type, reportsByType.getOrDefault(type, 0L) + 1);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("totalReports", totalReports);
        response.put("totalSos", totalSos);
        response.put("activeSos", activeSos);
        response.put("reportsByType", reportsByType);

        return response;
    }
}