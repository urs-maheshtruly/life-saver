package com.ursmahesh.securex.controller;

import com.ursmahesh.securex.service.UserService;
import com.ursmahesh.securex.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@CrossOrigin
@RestController
public class UserControl {
    @Autowired
    private UserService service;

    @PostMapping("/register-user")
    public Users register(@RequestBody Users user) {
        if (user.getMobile().length() > 10) {
            throw new IllegalArgumentException("Mobile number must be at most 10 digits");
        }

        if (user.getPin().length() > 5) {
            throw new IllegalArgumentException("PIN must be at most 5 characters");
        }
        System.out.println("Payload: " + user);
        return service.register(user);
    }

    @PostMapping("/login-user")
    public ResponseEntity<?> login(@RequestBody Users user) {
        try {
            System.out.println("Login request received for username: " + user.getUsername());
            System.out.println("Payload received: " + user);

            String token = service.verify(user);

            System.out.println("Token generated successfully: " + token);
            return ResponseEntity.ok(Collections.singletonMap("token", token)); // Return token as JSON
        } catch (Exception e) {
            System.err.println("Error during login: " + e.getMessage());
            e.printStackTrace(); // Print the full stack trace for debugging
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}