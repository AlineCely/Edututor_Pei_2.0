import 'package:flutter/material.dart';

class ThemeProvider with ChangeNotifier {
  ThemeMode _themeMode;

  ThemeProvider({ThemeMode initialTheme = ThemeMode.light})
      : _themeMode = initialTheme;

  ThemeMode get themeMode => _themeMode;

  void setTheme(ThemeMode theme) {
    _themeMode = theme;
    notifyListeners();
  }

  void toggleTheme() {
    _themeMode = _themeMode == ThemeMode.light
        ? ThemeMode.dark
        : ThemeMode.light;
    notifyListeners();
  }
}