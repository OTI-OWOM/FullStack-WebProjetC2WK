import 'package:flutter/material.dart';
import 'package:projet_c2w/models/user_model.dart';
import 'package:projet_c2w/services/api_user_service.dart';

import '../../shared/partials/user.dart';

class UsersPage extends StatefulWidget {
  const UsersPage({super.key});

  @override
  State<UsersPage> createState() => _UsersPageState();
}

class _UsersPageState extends State<UsersPage> {
  // Visibility indicators initialisers
  bool isLoaded = false;

  // A list of all the users
  late List<UserModel>? posts = [];

  @override
  void initState() {
    super.initState();
    _getData();
  }

  /// Calls the getUsers from the UserServices
  void _getData() async {
    posts = await ApiUserService().getUsers();
    setState(() {
      isLoaded = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white10,
      body: Padding(
        padding: const EdgeInsets.only(top: 10),
        child: Visibility(
          visible: isLoaded,
          child: ListView.builder(
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: posts?.length,
            itemBuilder: (context, index) {
              return userCardDefault(posts, index, context);
            },
          ),
        ),
      ),
    );
  }
}
