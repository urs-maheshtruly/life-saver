package com.ursmahesh.securex.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;



@Entity
@Getter
@Setter
public class Users  {


    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private String username;

    private String name;
    private String mobile;
    private String area;
    private String city;
    private String pin_code;
    private Integer age;
    private String pin;
    private String blood_group;

    @Column(name = "created_at")
    private LocalDateTime created_at;

    @Column(name = "updated_at")
    private LocalDateTime updated_at;



}
