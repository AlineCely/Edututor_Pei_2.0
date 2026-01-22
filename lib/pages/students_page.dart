import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/api_service.dart';
import '../models/student.dart';
import '../components/ui/button.dart';
import '../components/ui/card.dart';
import '../components/ui/sonner.dart';

class StudentsPage extends StatefulWidget {
  const StudentsPage({super.key});

  @override
  State<StudentsPage> createState() => _StudentsPageState();
}

class _StudentsPageState extends State<StudentsPage> {
  late Future<List<Student>> _studentsFuture;
  final ApiService _apiService = ApiService();

  @override
  void initState() {
    super.initState();
    _studentsFuture = _fetchStudents();
  }

  Future<List<Student>> _fetchStudents() async {
    try {
      return await _apiService.getStudents();
    } catch (e) {
      // Não usamos context aqui porque pode não estar disponível
      return [];
    }
  }

  Future<void> _refreshStudents() async {
    try {
      final students = await _apiService.getStudents();
      if (mounted) {
        setState(() {
          _studentsFuture = Future.value(students);
        });
      }
    } catch (e) {
      if (mounted) {
        Toaster.showError(context, 'Erro ao carregar alunos');
      }
    }
  }

  // Método seguro para mostrar toast
  void _showErrorIfMounted(String message) {
    if (mounted) {
      Toaster.showError(context, message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            _buildHeader(),
            const SizedBox(height: 24),
            // Content
            Expanded(
              child: FutureBuilder<List<Student>>(
                future: _studentsFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return _buildLoading();
                  }

                  if (snapshot.hasError) {
                    // Mostrar erro apenas quando o widget estiver montado
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      _showErrorIfMounted('Erro ao carregar alunos');
                    });
                    return _buildError();
                  }

                  final students = snapshot.data ?? [];

                  if (students.isEmpty) {
                    return _buildEmptyState();
                  }

                  return _buildStudentsList(students);
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _navigateToNewStudent(context),
        backgroundColor: Theme.of(context).colorScheme.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  // Método seguro para navegação
  void _navigateToNewStudent(BuildContext context) {
    if (mounted) {
      context.go('/students/new');
    }
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Alunos',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 4),
            Text(
              'Gestão de alunos com TEA',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
            ),
          ],
        ),
        CustomButton(
          onPressed: () => _navigateToNewStudent(context),
          label: 'Novo Aluno',
          icon: Icons.add,
        ),
      ],
    );
  }

  Widget _buildLoading() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CircularProgressIndicator(
            color: Theme.of(context).colorScheme.primary,
          ),
          const SizedBox(height: 16),
          Text(
            'Carregando alunos...',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),
    );
  }

  Widget _buildError() {
    return Center(
      child: CustomCard(
        backgroundColor: Colors.red[50],
        borderColor: Colors.red[200],
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.error_outline, color: Colors.red),
              const SizedBox(height: 8),
              Text(
                'Erro ao carregar alunos',
                style: TextStyle(
                  color: Colors.red[800],
                ),
              ),
              const SizedBox(height: 12),
              CustomButton(
                onPressed: _refreshStudents,
                label: 'Tentar novamente',
                icon: Icons.refresh,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CustomCard(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 32.0),
              child: Text(
                'Nenhum aluno cadastrado ainda',
                style: TextStyle(
                  color: Colors.grey[500],
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
          const SizedBox(height: 16),
          CustomButton(
            onPressed: () => _navigateToNewStudent(context),
            label: 'Adicionar primeiro aluno',
            icon: Icons.add,
          ),
        ],
      ),
    );
  }

  Widget _buildStudentsList(List<Student> students) {
    return RefreshIndicator(
      onRefresh: _refreshStudents,
      child: ListView.separated(
        itemCount: students.length,
        separatorBuilder: (context, index) => const SizedBox(height: 12),
        itemBuilder: (context, index) {
          final student = students[index];
          return _buildStudentCard(student);
        },
      ),
    );
  }

  Widget _buildStudentCard(Student student) {
    return GestureDetector(
      onTap: () {
        if (mounted) {
          context.go('/students/${student.id}');
        }
      },
      child: CustomCard(
        elevation: 2,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          student.name,
                          style: const TextStyle(
                            fontWeight: FontWeight.w600,
                            fontSize: 18,
                          ),
                        ),
                        const SizedBox(height: 8),
                        if (student.schoolGrade != null || student.schoolName != null)
                          Text(
                            _buildSchoolInfo(student),
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey[600],
                            ),
                          ),
                        if (student.guardianName != null) ...[
                          const SizedBox(height: 4),
                          Text(
                            'Responsável: ${student.guardianName}',
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                  if (student.createdAt != null)
                    Text(
                      _formatDate(student.createdAt!),
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[500],
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _buildSchoolInfo(Student student) {
    final parts = <String>[];
    if (student.schoolGrade != null) {
      parts.add('Série: ${student.schoolGrade}');
    }
    if (student.schoolName != null) {
      parts.add(student.schoolName!);
    }
    return parts.join(' • ');
  }

  String _formatDate(DateTime date) {
    return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }
}