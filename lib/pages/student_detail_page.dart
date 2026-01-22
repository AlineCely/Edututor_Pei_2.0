import 'package:flutter/material.dart';

class StudentDetailPage extends StatelessWidget {
  final int studentId;

  const StudentDetailPage({
    super.key,
    required this.studentId,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Student Details - ID: $studentId'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Student ID: $studentId'),
            // Adicionar mais detalhes do estudante aqui
          ],
        ),
      ),
    );
  }
}