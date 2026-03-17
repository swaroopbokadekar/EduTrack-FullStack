package com.edutrack.controller;

import com.edutrack.entity.Marks;
import com.edutrack.repository.MarksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/marks")
@CrossOrigin(origins = "*") // Allows your React frontend to talk to this API
public class MarksController {

    @Autowired
    private MarksRepository marksRepository;

    @GetMapping
    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    @PostMapping("/add")
    public Marks addMarks(@RequestBody Marks marks) {
        // Check if marks for this student and subject already exist
        Optional<Marks> existingMarks = marksRepository.findByStudentIdAndSubject(
            marks.getStudentId(), 
            marks.getSubject()
        );

        if (existingMarks.isPresent()) {
            // Update the existing score
            Marks toUpdate = existingMarks.get();
            toUpdate.setScore(marks.getScore());
            return marksRepository.save(toUpdate);
        } else {
            // Create new record
            return marksRepository.save(marks);
        }
    }
}