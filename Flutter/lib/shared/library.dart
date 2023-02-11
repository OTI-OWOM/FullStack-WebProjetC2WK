import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_user_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/authentication_model.dart';
import '../models/user_model.dart';

/// Set the token in the Shared Preferences.
///
/// Params :
///    - posts - An Auth model that stores the token and userid.
///    - logOut - A boolean weather we want to logout (forget the token) or login.
Future<void> setToken({Auth? posts, bool logOut = false}) async {
  final prefs = await SharedPreferences.getInstance();
  if (logOut) {
    prefs.setString('token', '');
    prefs.setString('id', '');
  } else {
    prefs.setString('token', posts!.token);
    prefs.setString('id', posts.userId);
  }
}

/// Gets the token in the Shared Preferences.
///
/// Return : This function returns a Future<String>, the token of the user signed in
Future<String?> getToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('token');
}

/// Verifies if the user is logged in.
///
/// Return : Returns a boolean, weather the user is loggin or not
Future<bool> isLoggedIn() async {
  String? token = await getToken();
  UserModel? user = await ApiUserService().getUser(isMe: true);
  if (token == '' || user == null) {
    return true;
  }
  return false;
}

/// Get the current user id.
///
/// Return : The id of the user that is logged in.
Future<String> currentUserId() async {
  UserModel? user = await ApiUserService().getUser(isMe: true);
  return user!.id;
}

/// Crates an empty user model.
///
/// Returns : Returns an empty user model
UserModel emptyUser() {
  return const UserModel(
      id: '', username: '', password: '', role: '', email: '', adresse: '');
}

/// Crates an empty product model.
///
/// Returns : Returns an empty product model
ProductsModel emptyProduct() {
  return const ProductsModel(
      id: "", userId: "", name: "", price: 0, description: "", v: 0);
}

/// Create a login icon.
///
/// Params :
///    - context - A BuildContext needed for routing.
///
/// Return : A login Icon.
IconButton loginIcon(BuildContext context) {
  return IconButton(
    icon: const Icon(
      Icons.account_circle,
      size: 32,
    ),
    tooltip: 'Login',
    onPressed: () => GoRouter.of(context).go('/Login'),
  );
}

/// Create a logout icon.
///
/// Params :
///    - context - A BuildContext needed for routing.
///
/// Return : A logout Icon.
IconButton logoutIcon(BuildContext context) {
  return IconButton(
    icon: const Icon(
      Icons.power_settings_new_rounded,
      size: 28,
    ),
    tooltip: 'Logout',
    onPressed: () {
      setToken(logOut: true);
      GoRouter.of(context).go('/Login');
    },
  );
}
