import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:projet_c2w/shared/constants.dart';
import 'package:projet_c2w/models/authentication_model.dart';
import 'package:projet_c2w/models/user_model.dart';
import '../shared/library.dart';

/// A class that has all the services used for the users or users.
class ApiUserService {
  String? token = '';

  /// Get all users from DB.
  ///
  /// Return : A Future list of UserModel
  Future<List<UserModel>?> getUsers() async {
    try {
      Uri url = Uri.parse(UrlUsers.usersEndpoint);
      final response = await http.get(url);
      if (response.statusCode == 200) {
        List<UserModel> model =
            userModelFromJson(response.body.replaceAll('_id', 'id'));
        return model;
      }
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Get a certain user or get current user.
  ///
  /// Params :
  ///    - userId - the id of the user we are searching for.
  ///    - isMe - a boolean, false by default, wheater the user is the current user.
  ///
  /// Return : A Future UserModel
  Future<UserModel?> getUser({String? userId = '', bool isMe = false}) async {
    try {
      await getToken().then((value) => token = value);
      Uri url;
      if (isMe) {
        url = Uri.parse(UrlUsers.userMeEndpoint);
      } else {
        url = Uri.parse('${UrlUsers.userEndpoint}$userId');
      }
      final response = await http.get(url, headers: <String, String>{
        'authorization': 'Bearer $token',
      });
      if (response.statusCode == 200) {
        return UserModel.fromJson(
            jsonDecode(response.body.replaceAll('_id', 'id')));
      } else {
        return null;
      }
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Modify a certain user.
  ///
  /// Params :
  ///    - userId - the id of the user we are searching for.
  ///    - modifications - Map with the fields we want to modify.
  ///
  /// Return : A message wheater the user was modified or not.
  Future<String?> modifyUser(
      String? userId, Map<String, String> modifications) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse('${UrlUsers.userEndpoint}$userId');
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

  /// Register a certain user.
  ///
  /// Params : user - A UserModel of the user we want to register.
  ///
  /// Return : A message wheater the user was created or not.
  Future<String?> registerUser(UserModel user) async {
    try {
      Uri url = Uri.parse(UrlUsers.userRegisterEndpoint);
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(user.toJson()),
      );
      return jsonDecode(response.body)["message"];
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }

  /// Delete a certain user.
  ///
  /// Params : userId - the id of the user we are searching for.
  ///
  /// Return : A message wheater the user was deleted or not.
  Future<String?> deleteUser(String? userId) async {
    try {
      await getToken().then((value) => token = value);
      Uri url = Uri.parse('${UrlUsers.userEndpoint}$userId');
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

  /// Get the login credentials.
  ///
  /// Params :
  ///    - email - A string containing the email.
  ///    - password - A string containing the password.
  Future<Auth?> login(String email, String password) async {
    try {
      Uri url = Uri.parse(UrlUsers.userLoginEndpoint);
      final response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );
      return Auth.fromJson(jsonDecode(response.body));
    } catch (e) {
      debugPrint('ERROR - $e');
    }
    return null;
  }
}
