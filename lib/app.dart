import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'components/error_boundary.dart';
import 'contexts/theme_context.dart';
import 'router/app_router.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return ErrorBoundary(
      child: ChangeNotifierProvider(
        create: (_) => ThemeProvider(initialTheme: ThemeMode.light),
        child: Consumer<ThemeProvider>(
          builder: (context, themeProvider, child) {
            return MaterialApp.router(
              title: 'School Management',
              theme: ThemeData.light(),
              darkTheme: ThemeData.dark(),
              themeMode: themeProvider.themeMode,
              routerConfig: AppRouter.router,
              debugShowCheckedModeBanner: false,
              builder: (context, child) {
                return TooltipVisibility(
                  visible: false, // Configurar conforme necessário
                  child: child!,
                );
              },
            );
          },
        ),
      ),
    );
  }
}