package com.config.service.implement;

import com.config.exception.CustomerException;
import com.config.model.Student;
import com.config.repository.StudentRepository;
import com.config.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentImplement implements StudentService {

    @Autowired private StudentRepository studentRepository;

    @Override
    public List<Student> selectAllStudent() {
        List<Student> students = studentRepository.findAll();
        return students;
    }

    @Override
    public Student selectStudentById(long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new CustomerException("Student is not found"));
        return student;
    }

    @Override
    public Student createStudent(Student student) {
        System.out.println("stu: " +student);
        Optional<Student> selectStudent = studentRepository.findById(student.getId());
        if (selectStudent.isPresent()) {
            throw new CustomerException("Student already exists");
        }
        Student newStudent = studentRepository.save(student);
        return newStudent;
    }

    @Override
    public Student updateStudent(Student student) {

        Student selectStudent = selectStudentById(student.getId());
        if (selectStudent == null) {
            throw new CustomerException("Student is not found");
        }
        Student updateStudent = studentRepository.save(student);
        return updateStudent;
    }

    @Override
    public void deleteStudent(long id) {
        Student selectStudent = selectStudentById(id);
        if (selectStudent == null) {
            throw new CustomerException("Student is not found");
        }
        studentRepository.delete(selectStudent);
    }
}
