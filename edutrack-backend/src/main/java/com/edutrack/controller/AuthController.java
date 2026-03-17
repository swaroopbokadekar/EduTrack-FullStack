package com.edutrack.controller;

import com.edutrack.entity.User;
import com.edutrack.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return "Success";
        }
        return "Failure";
    }

    // Temporary: Add this to create a user since we don't have a Signup page yet
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }
}