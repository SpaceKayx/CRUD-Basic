package com.config.service;

import com.config.model.Student;

import java.util.List;

public interface StudentService {

    List<Student> selectAllStudent();

    Student selectStudentById(long id);

    Student createStudent(Student student);

    Student updateStudent(Student student);

    void deleteStudent(long id);

}
