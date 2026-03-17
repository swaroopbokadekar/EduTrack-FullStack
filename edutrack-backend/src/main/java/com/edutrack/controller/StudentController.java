package com.edutrack.controller;

import com.edutrack.entity.Student_fixed;
import com.edutrack.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Allows React to talk to Java
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // This URL will be: http://localhost:8080/api/students (GET)
    @GetMapping
    public List<Student_fixed> getAllStudents() {
        return studentRepository.findAll();
    }

    // This URL will be: http://localhost:8080/api/students (POST)
    @PostMapping
    public Student_fixed addStudent(@RequestBody Student_fixed student) {
        return studentRepository.save(student);
    }
    
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}