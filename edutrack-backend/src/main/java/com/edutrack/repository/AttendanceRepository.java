package com.edutrack.repository;

import com.edutrack.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.time.LocalDate;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    
    /**
     * Finds a record by Student ID and Date. 
     * Uses LocalDate to match the database DATE type.
     */
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
}