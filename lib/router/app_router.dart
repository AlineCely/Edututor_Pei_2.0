import 'package:go_router/go_router.dart';
import '../pages/home_page.dart';
import '../pages/students_page.dart';
import '../pages/student_detail_page.dart';
import '../pages/agenda_page.dart';
import '../pages/behaviors_page.dart';
import '../pages/reports_page.dart';
import '../pages/messages_page.dart';
import '../pages/not_found_page.dart';
import '../components/dashboard_layout.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    errorBuilder: (context, state) => const NotFoundPage(),
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardLayout(
          child: HomePage(),
        ),
      ),
      GoRoute(
        path: '/students',
        builder: (context, state) => const DashboardLayout(
          child: StudentsPage(),
        ),
      ),
      GoRoute(
        path: '/students/:id',
        builder: (context, state) {
          final id = int.tryParse(state.pathParameters['id'] ?? '');
          return DashboardLayout(
            child: StudentDetailPage(studentId: id ?? 0),
          );
        },
      ),
      GoRoute(
        path: '/agenda',
        builder: (context, state) => const DashboardLayout(
          child: AgendaPage(),
        ),
      ),
      GoRoute(
        path: '/behaviors',
        builder: (context, state) => const DashboardLayout(
          child: BehaviorsPage(),
        ),
      ),
      GoRoute(
        path: '/reports',
        builder: (context, state) => const DashboardLayout(
          child: ReportsPage(),
        ),
      ),
      GoRoute(
        path: '/messages',
        builder: (context, state) => const DashboardLayout(
          child: MessagesPage(),
        ),
      ),
      GoRoute(
        path: '/404',
        builder: (context, state) => const NotFoundPage(),
      ),
    ],
  );
}