import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/user_model.dart';
import 'package:projet_c2w/services/api_user_service.dart';
import '../../models/authentication_model.dart';
import '../../shared/partials/user.dart';

class UserPage extends StatefulWidget {
  const UserPage({super.key, this.id = ''});
  final String? id;

  @override
  State<UserPage> createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  // TextEditingController initialisers
  final email = TextEditingController();
  final password = TextEditingController();
  final username = TextEditingController();
  final adresse = TextEditingController();

  // A Map that will contain the modifications
  Map userModification = {};

  // A message that indicates the state of the widget
  String? message = '';

  // Visibility indicators initialisers
  bool isLoaded = false;
  bool isLoading = true;
  bool modify = false;

  // The current user
  late UserModel? user;

  // Auth model initialiser
  late Auth? posts;

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    username.dispose();
    adresse.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _getData();
  }

  /// Gets the user that is searched and adds it to a user varibale.
  void _getData() async {
    user = await ApiUserService().getUser(userId: widget.id, isMe: false);
    Future.delayed(const Duration(milliseconds: 300))
        .then((value) => setState(() {
              if (user == null) {
                GoRouter.of(context).go('/Error');
              } else {
                isLoaded = true;
              }
            }));
  }

  /// Calls the delete method from the UserServices
  void _deleteUser() async {
    message = await ApiUserService().deleteUser(user!.id);
    setState(() {});
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              isLoading = true;
              GoRouter.of(context).pop();
            }));
  }

  /// This function is for esthetic purposes
  void _myProducts() async {
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              GoRouter.of(context).push('/ProductsFromUser/${widget.id}');
              isLoading = false;
            }));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.center,
          end: Alignment.bottomCenter,
          colors: [Color.fromARGB(255, 158, 160, 206), Colors.black87],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: true,
          title: const Text('User'),
        ),
        body: Visibility(
          visible: isLoaded,
          replacement:
              const Center(child: CircularProgressIndicator.adaptive()),
          child: Center(
            child: Container(
              height: 680,
              width: 380,
              decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.all(Radius.circular(25))),
              child: Stack(
                children: [
                  Positioned(
                    child: ListView.builder(
                      itemCount: 1,
                      itemBuilder: (context, index) {
                        return Padding(
                          padding: const EdgeInsets.all(25.0),
                          child: Column(
                            children: [
                              const Padding(
                                padding: EdgeInsets.only(bottom: 30, top: 10),
                                child: CircleAvatar(
                                  backgroundColor: Colors.black,
                                  radius: 118,
                                  child: CircleAvatar(
                                    backgroundColor:
                                        Color.fromARGB(255, 244, 230, 230),
                                    radius: 113,
                                    backgroundImage:
                                        AssetImage('images/user2.png'),
                                  ),
                                ),
                              ),
                              profileText(user!.username, "Username"),
                              profileText(user!.email, "Email"),
                              profileText(user!.adresse, "Adresse"),
                              profileText(user!.role, "Role"),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: <Widget>[
                                  Padding(
                                    padding: const EdgeInsets.only(top: 15),
                                    child: Visibility(
                                      visible: isLoading,
                                      replacement:
                                          const CircularProgressIndicator(),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          ElevatedButton(
                                            onPressed: () {
                                              setState(() {
                                                isLoading = false;
                                                _myProducts();
                                              });
                                            },
                                            child: const Text('User Products'),
                                          ),
                                          Padding(
                                            padding:
                                                const EdgeInsets.only(left: 20),
                                            child: ElevatedButton(
                                              onPressed: () {
                                                setState(() {
                                                  message = '';
                                                  isLoading = false;
                                                  _deleteUser();
                                                });
                                              },
                                              child: const Text('Delete'),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  )
                                ],
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                  Positioned(
                    right: 70,
                    top: 190,
                    child: CircleAvatar(
                      backgroundColor: Colors.black,
                      foregroundColor: Colors.white,
                      child: IconButton(
                          onPressed: () => GoRouter.of(context)
                              .pushNamed('modify', params: {'id': user!.id}),
                          icon: const Icon(Icons.edit)),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
