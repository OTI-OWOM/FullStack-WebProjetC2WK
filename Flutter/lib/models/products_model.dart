import 'package:flutter/material.dart';
import 'dart:convert';

List<ProductsModel> productsModelFromJson(String str) =>
    List<ProductsModel>.from(json.decode(str).map((x) => ProductsModel.fromJson(x)));

String productsModelToJson(List<ProductsModel> data) =>
    json.encode(List<dynamic>.from(data.map((e) => e.toJson())));

@immutable
class ProductsModel {
  const ProductsModel({
    required this.id,
    required this.userId,
    required this.name,
    required this.price,
    required this.description,
    required this.v,
  });

  final String id;
  final String? userId;
  final String name;
  final num price;
  final String description;
  final num v;

  factory ProductsModel.fromJson(Map<String, dynamic> json) => ProductsModel(
        id: json.containsKey("id") ? json["id"] : "",
        userId: json.containsKey("userId") ? json["userId"] : "",
        name: json.containsKey("name") ? json["name"] : "",
        price: json.containsKey("price") ? json["price"] : 0,
        description: json.containsKey("description") ? json["description"] : "",
        v: json.containsKey("v") ? json["v"] : 0,
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "userId": userId,
        "name": name,
        "price": price,
        "description": description,
        "v": v,
      };
}
