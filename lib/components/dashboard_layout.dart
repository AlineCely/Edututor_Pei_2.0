import 'package:flutter/material.dart';

class DashboardLayout extends StatelessWidget {
  final Widget child;
  
  const DashboardLayout({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        // Adicionar menu drawer/hamburger aqui
      ),
      drawer: const Drawer(
        // Adicionar menu lateral
        child: Column(
          children: [
            DrawerHeader(
              child: Text('Menu'),
            ),
            ListTile(
              leading: Icon(Icons.home),
              title: Text('Home'),
            ),
            ListTile(
              leading: Icon(Icons.people),
              title: Text('Students'),
            ),
            // Adicionar mais itens do menu
          ],
        ),
      ),
      body: SafeArea(
        child: child,
      ),
    );
  }
}