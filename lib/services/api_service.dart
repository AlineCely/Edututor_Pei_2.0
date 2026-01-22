import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/student.dart';

class ApiService {
  static const String _baseUrl = 'http://localhost:3000/api'; // Ajuste para sua API

  Future<List<Student>> getStudents() async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/students'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Student.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load students');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<Student> getStudentById(int id) async {
    try {
      final response = await http.get(
        Uri.parse('$_baseUrl/students/$id'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        return Student.fromJson(data);
      } else {
        throw Exception('Failed to load student');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<Student> createStudent(Map<String, dynamic> studentData) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/students'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(studentData),
      );

      if (response.statusCode == 201) {
        final Map<String, dynamic> data = json.decode(response.body);
        return Student.fromJson(data);
      } else {
        throw Exception('Failed to create student');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<Student> updateStudent(int id, Map<String, dynamic> studentData) async {
    try {
      final response = await http.put(
        Uri.parse('$_baseUrl/students/$id'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(studentData),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        return Student.fromJson(data);
      } else {
        throw Exception('Failed to update student');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  Future<void> deleteStudent(int id) async {
    try {
      final response = await http.delete(
        Uri.parse('$_baseUrl/students/$id'),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode != 204) {
        throw Exception('Failed to delete student');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }
}