import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../models/user_model.dart';

/// Creates a custom card for the users.
///
/// Params :
///    - posts - A List of users.
///    - index - An integer indication the index
///    - context - A BuildContext used for routing
///
/// Return : A custom card for the users.
Card userCardDefault(List<UserModel>? posts, int index, BuildContext context) {
  return Card(
    color: const Color.fromARGB(222, 255, 255, 255),
    elevation: 8.0,
    margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
    child: ListTile(
      title: Text(
        posts![index].username,
        style:
            const TextStyle(fontWeight: FontWeight.bold, color: Colors.black),
      ),
      leading: Container(
        padding: const EdgeInsets.only(right: 12.0),
        decoration: const BoxDecoration(
          border: Border(right: BorderSide(width: 1.0, color: Colors.black)),
        ),
        child: const Icon(
          Icons.person_outline_sharp,
          color: Colors.black,
        ),
      ),
      contentPadding:
          const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
      horizontalTitleGap: 10,
      onTap: () =>
          GoRouter.of(context).goNamed('user', params: {'id': posts[index].id}),
      trailing: const Icon(Icons.keyboard_arrow_right),
    ),
  );
}

/// Creates a custom Text field for the different parameters of a user.
///
/// Params :
///    - user - The name of the user.
///    - header - The header
///
/// Return : A custom Text field.
Column profileText(String? user, String header) {
  return Column(
    children: [
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            header,
            style: const TextStyle(
                fontSize: 15, fontWeight: FontWeight.w500, color: Colors.grey),
          ),
          const SizedBox(
            height: 1,
          ),
          Container(
            width: 350,
            height: 40,
            decoration: const BoxDecoration(
                border: Border(
                    bottom: BorderSide(
              color: Colors.grey,
              width: 1,
            ))),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    user!,
                    style: const TextStyle(
                        fontSize: 18, height: 1.8, color: Colors.black),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    ],
  );
}
