import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../services/auth_service.dart';
import '../components/ui/button.dart';
import '../components/ui/sonner.dart';
import '../components/markdown_renderer.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late AuthService _authService;
  bool _isLoading = true;
  bool _isAuthenticated = false;
  Map<String, dynamic>? _user;
  String? _error;

  @override
  void initState() {
    super.initState();
    _authService = AuthService();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final user = await _authService.getCurrentUser();
      if (mounted) {
        setState(() {
          _isAuthenticated = user != null;
          _user = user;
          _error = null;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _error = e.toString();
          _isAuthenticated = false;
        });
        _showToastIfMounted('Erro ao verificar autenticação');
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _handleLogout() async {
    setState(() {
      _isLoading = true;
    });

    try {
      await _authService.logout();
      _showToastIfMounted('Logout realizado com sucesso');
      // Redirecionar para página de login
      if (mounted) {
        _navigateToLogin();
      }
    } catch (e) {
      _showToastIfMounted('Erro ao fazer logout');
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _navigateToLogin() {
    if (mounted) {
      context.go('/login');
    }
  }

  // Método seguro para mostrar toast
  void _showToastIfMounted(String message) {
    if (mounted) {
      Toaster.showInfo(context, message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoading
          ? _buildLoading()
          : _error != null
              ? _buildError()
              : _buildContent(),
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
            'Carregando...',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
        ],
      ),
    );
  }

  Widget _buildError() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Icon(Icons.error_outline, size: 64, color: Colors.red),
          const SizedBox(height: 16),
          Text(
            'Erro: $_error',
            style: const TextStyle(color: Colors.red),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 24),
          CustomButton(
            onPressed: _checkAuth,
            label: 'Tentar novamente',
            icon: Icons.refresh,
          ),
        ],
      ),
    );
  }

  Widget _buildContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header com informações de autenticação
          _buildAuthHeader(),
          const SizedBox(height: 32),
          
          // Conteúdo principal
          _buildMainContent(),
          const SizedBox(height: 32),
          
          // Seção de exemplo
          _buildExampleSection(),
          const SizedBox(height: 32),
          
          // Botões de ação
          _buildActionButtons(),
        ],
      ),
    );
  }

  Widget _buildAuthHeader() {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _isAuthenticated ? 'Bem-vindo!' : 'Visitante',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 4),
                if (_isAuthenticated && _user != null)
                  Text(
                    _user!['email'] ?? _user!['name'] ?? 'Usuário',
                    style: TextStyle(
                      color: Colors.grey[600],
                    ),
                  )
                else
                  Text(
                    'Faça login para acessar todos os recursos',
                    style: TextStyle(
                      color: Colors.grey[600],
                    ),
                  ),
              ],
            ),
            if (_isAuthenticated)
              CustomButton(
                onPressed: _handleLogout,
                label: 'Sair',
                icon: Icons.logout,
                backgroundColor: Colors.red,
              )
            else
              CustomButton(
                onPressed: _navigateToLogin,
                label: 'Entrar',
                icon: Icons.login,
              ),
          ],
        ),
      ),
    );
  }

  Widget _buildMainContent() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Página Inicial',
          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
        ),
        const SizedBox(height: 8),
        Text(
          'Este é um exemplo de página com autenticação',
          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                color: Colors.grey[600],
              ),
        ),
      ],
    );
  }

  Widget _buildExampleSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Exemplos de Componentes',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w600,
              ),
        ),
        const SizedBox(height: 16),
        
        // Exemplo de loading
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Ícone de Loading',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text('Exemplo: lucide-react para ícones'),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        
        // Exemplo de markdown
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Renderização de Markdown',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 12),
                MarkdownRenderer(
                  content: 'Qualquer conteúdo **markdown** pode ser renderizado aqui.\n\n- Item 1\n- Item 2\n- Item 3\n\n```dart\nvoid main() {\n  print("Hello World");\n}\n```',
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildActionButtons() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        CustomButton(
          onPressed: () {
            Toaster.showInfo(context, 'Botão exemplo clicado!');
          },
          label: 'Botão Exemplo',
          icon: Icons.check,
        ),
        CustomButton(
          onPressed: () {
            // Usar WidgetsBinding para operações após o build
            WidgetsBinding.instance.addPostFrameCallback((_) {
              Toaster.showSuccess(context, 'Funcionalidade de tema em desenvolvimento');
            });
          },
          label: 'Alternar Tema',
          icon: Icons.color_lens,
          backgroundColor: Colors.purple,
        ),
        if (!_isAuthenticated)
          CustomButton(
            onPressed: _navigateToLogin,
            label: 'Página de Login',
            icon: Icons.login,
            backgroundColor: Colors.green,
          ),
      ],
    );
  }
}