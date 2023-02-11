import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:projet_c2w/shared/constants.dart';
import 'package:projet_c2w/models/products_model.dart';
import '../shared/library.dart';

class ApiProductsService {
  String? token = '';

  /// Get all products from DB.
  ///
  /// Return : A Future list of ProductModel
  Future<List<ProductsModel>?> getProducts() async {
    try {
      Uri url = Uri.parse(UrlUsers.productsEndpoint);
      var response = await http.get(url);
      if (response.statusCode == 200) {
        List<ProductsModel> model =
            productsModelFromJson(response.body.replaceAll('_id', 'id'));
        return model;
      }
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Get a all products from a certain user.
  ///
  /// Params :
  ///    - userId - the id of the user we are searching for.
  ///
  /// Return : A Future list of ProductModel
  Future<List<ProductsModel>?> getProductsFromUser(String? userId) async {
    try {
      Uri url = Uri.parse('${UrlUsers.productsEndpoint}$userId');
      var response = await http.get(url);
      if (response.statusCode == 200) {
        List<ProductsModel> model =
            productsModelFromJson(response.body.replaceAll('_id', 'id'));
        return model;
      }
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Get a certain product.
  ///
  /// Params :
  ///    - productId - the id of the product we are searching for.
  ///
  /// Return : A Future ProductModel
  Future<ProductsModel?> getProduct({String? productId = ''}) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse('${UrlUsers.productEndpoint}$productId');
      var response = await http.get(url, headers: <String, String>{
        'authorization': 'Bearer $token',
      });
      if (response.statusCode == 200) {
        return ProductsModel.fromJson(
            jsonDecode(response.body.replaceAll('_id', 'id')));
      } else {
        return emptyProduct();
      }
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Modify a certain product.
  ///
  /// Params :
  ///    - productId - the id of the product we are searching for.
  ///    - modifications - Map with the fields we want to modify.
  ///
  /// Return : A message wheater the user was modified or not.
  Future<String?> modifyProduct(
      String? productId, Map<String, dynamic> modifications) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse('${UrlUsers.productEndpoint}$productId');
      final response = await http.put(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'authorization': 'Bearer $token',
        },
        body: jsonEncode(modifications),
      );
      return jsonDecode(response.body)["message"];
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Create a product.
  ///
  /// Params : product - A ProductModel of the product we want to create.
  ///
  /// Return : A message wheater the user was created or not.
  Future<String?> createProduct(ProductsModel product) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse(UrlUsers.productCreateEndpoint);
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'authorization': 'Bearer $token',
        },
        body: jsonEncode({"product": product.toJson()}),
      );
      return jsonDecode(response.body)["message"];
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Delete a certain product.
  ///
  /// Params : productId - the id of the product we are searching for.
  ///
  /// Return : A message wheater the product was deleted or not.
  Future<String?> deleteProduct(String? productId) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse('${UrlUsers.productEndpoint}$productId');
      final response = await http.delete(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'authorization': 'Bearer $token',
        },
      );
      return jsonDecode(response.body)["message"];
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }
}
