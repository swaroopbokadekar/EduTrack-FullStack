package com.edutrack.repository;

import com.edutrack.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // Handle potential null values safely

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    
    /**
     * Finds existing marks for a specific student and subject domain.
     * This is used to perform an "Upsert" (Update or Insert) logic.
     */
    Optional<Marks> findByStudentIdAndSubject(Long studentId, String subject);
}