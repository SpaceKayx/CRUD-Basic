package com.config.controller;


import com.config.model.Student;
import com.config.service.implement.StudentImplement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired private StudentImplement studentSQLService;

    @GetMapping()
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> listStudent = studentSQLService.selectAllStudent();
        return ResponseEntity.ok().body(listStudent);
    }
    @PostMapping()
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student createStudent = studentSQLService.createStudent(student);
        return new ResponseEntity<>(createStudent, HttpStatus.CREATED);
    }

    @PutMapping("/{studentId}")
    public ResponseEntity<Student> updateStudent(@PathVariable long studentId, @RequestBody Student student) {
        Student updateStudent = studentSQLService.updateStudent(student);
        return ResponseEntity.ok(updateStudent);
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<HttpStatus> deleteStudent(@PathVariable long studentId) {
        System.out.println("studentId: " +studentId);
        studentSQLService.deleteStudent(studentId);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }
}
