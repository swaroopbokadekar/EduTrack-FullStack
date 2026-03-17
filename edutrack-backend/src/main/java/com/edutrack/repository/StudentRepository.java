package com.edutrack.repository;

import com.edutrack.entity.Student_fixed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student_fixed, Long> {
    // This interface allows us to save and find students in the database
}