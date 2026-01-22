class Student {
  final int id;
  final String name;
  final String? schoolGrade;
  final String? schoolName;
  final String? guardianName;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  Student({
    required this.id,
    required this.name,
    this.schoolGrade,
    this.schoolName,
    this.guardianName,
    this.createdAt,
    this.updatedAt,
  });

  factory Student.fromJson(Map<String, dynamic> json) {
    return Student(
      id: json['id'],
      name: json['name'],
      schoolGrade: json['schoolGrade'],
      schoolName: json['schoolName'],
      guardianName: json['guardianName'],
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : null,
      updatedAt: json['updatedAt'] != null
          ? DateTime.parse(json['updatedAt'])
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'schoolGrade': schoolGrade,
      'schoolName': schoolName,
      'guardianName': guardianName,
      'createdAt': createdAt?.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}