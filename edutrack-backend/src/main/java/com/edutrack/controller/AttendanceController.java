package com.edutrack.controller;

import com.edutrack.entity.Attendance;
import com.edutrack.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @PostMapping("/mark")
    public Attendance markAttendance(@RequestBody Attendance attendance) {
        // 1. Handle missing date
        if (attendance.getDate() == null) {
            attendance.setDate(LocalDate.now());
        }

        // 2. Perform the Upsert Logic (Check for existing record)
        Optional<Attendance> existingRecord = attendanceRepository.findByStudentIdAndDate(
            attendance.getStudentId(), 
            attendance.getDate()
        );

        if (existingRecord.isPresent()) {
            // 3. Update existing entry
            Attendance recordToUpdate = existingRecord.get();
            recordToUpdate.setStatus(attendance.getStatus());
            return attendanceRepository.save(recordToUpdate);
        } else {
            // 4. Create new entry
            return attendanceRepository.save(attendance);
        }
    }
}