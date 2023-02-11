import 'package:flutter/material.dart';
import 'dart:convert';

List<UserModel> userModelFromJson(String str) =>
    List<UserModel>.from(json.decode(str).map((x) => UserModel.fromJson(x)));

String userModelToJson(List<UserModel> data) =>
    json.encode(List<dynamic>.from(data.map((e) => e.toJson())));

@immutable
class UserModel {
  const UserModel({
    required this.id,
    required this.username,
    required this.password,
    required this.role,
    required this.email,
    required this.adresse,
  });

  final String id;
  final String username;
  final String password;
  final String role;
  final String email;
  final String adresse;

  factory UserModel.fromJson(Map<String, dynamic> json) => UserModel(
        id: json.containsKey("id") ? json["id"] : "",
        username: json.containsKey("username") ? json["username"] : "",
        password: json.containsKey("password") ? json["password"] : "",
        role: json.containsKey("role") ? json["role"] : "",
        email: json.containsKey("email") ? json["email"] : "",
        adresse: json.containsKey("adresse") ? json["adresse"] : "",
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "username": username,
        "password": password,
        "role": role,
        "email": email,
        "adresse": adresse,
      };
}
