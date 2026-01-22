import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

class AuthService {
  static const String _baseUrl = 'http://localhost:3000/api'; // Ajuste para sua API
  static const FlutterSecureStorage _storage = FlutterSecureStorage();

  // URLs de login (equivalente ao getLoginUrl do React)
  static String get loginUrl => '/login';
  static String get registerUrl => '/register';
  static String get forgotPasswordUrl => '/forgot-password';

  Future<Map<String, dynamic>?> getCurrentUser() async {
    try {
      final token = await _getToken();
      if (token == null) return null;

      final response = await http.get(
        Uri.parse('$_baseUrl/auth/me'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        return json.decode(response.body);
      } else {
        await _clearToken();
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  Future<bool> isAuthenticated() async {
    final token = await _getToken();
    return token != null;
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        await _saveToken(data['token']);
        return data;
      } else {
        throw Exception('Falha no login: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Erro: $e');
    }
  }

  Future<void> logout() async {
    try {
      final token = await _getToken();
      if (token != null) {
        await http.post(
          Uri.parse('$_baseUrl/auth/logout'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token',
          },
        );
      }
    } finally {
      await _clearToken();
    }
  }

  Future<void> _saveToken(String token) async {
    await _storage.write(key: 'auth_token', value: token);
  }

  Future<String?> _getToken() async {
    return await _storage.read(key: 'auth_token');
  }

  Future<void> _clearToken() async {
    await _storage.delete(key: 'auth_token');
  }

  // Métodos adicionais
  Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/register'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'name': name,
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 201) {
        final Map<String, dynamic> data = json.decode(response.body);
        await _saveToken(data['token']);
        return data;
      } else {
        throw Exception('Falha no registro: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Erro: $e');
    }
  }

  Future<void> resetPassword({
    required String email,
    required String token,
    required String newPassword,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/auth/reset-password'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'token': token,
          'newPassword': newPassword,
        }),
      );

      if (response.statusCode != 200) {
        throw Exception('Falha ao redefinir senha');
      }
    } catch (e) {
      throw Exception('Erro: $e');
    }
  }
}