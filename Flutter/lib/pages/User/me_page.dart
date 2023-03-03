import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/user_model.dart';
import 'package:projet_c2w/services/api_user_service.dart';
import '../../models/authentication_model.dart';
import '../../shared/partials/user.dart';

class MePage extends StatefulWidget {
  const MePage({super.key, this.id = ''});
  final String? id;

  @override
  State<MePage> createState() => _MePageState();
}

class _MePageState extends State<MePage> {
  // TextEditingController initialisers
  final email = TextEditingController();
  final password = TextEditingController();
  final username = TextEditingController();
  final adresse = TextEditingController();

  // A Map that will contain the modifications
  Map userModification = {};

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
    user = await ApiUserService().getUser(isMe: true);
    setState(() {
      isLoaded = true;
    });
  }

  /// Calls the delete method from the UserServices
  void _deleteUser() async {
    await ApiUserService().deleteUser(user!.id);
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              GoRouter.of(context).go('/Login');
              isLoading = false;
            }));
  }

  /// This function is for esthetic purposes
  void _myProducts() async {
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              GoRouter.of(context).push('/ProductsFromUser/${user!.id}');
              isLoading = false;
            }));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.transparent,
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Visibility(
          visible: isLoaded,
          replacement:
              const Center(child: CircularProgressIndicator.adaptive()),
          child: Center(
            child: Container(
              height: 620,
              width: 385,
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
                          padding: const EdgeInsets.all(20.0),
                          child: Column(
                            children: [
                              const Padding(
                                padding: EdgeInsets.only(bottom: 30, top: 10),
                                child: CircleAvatar(
                                  backgroundColor: Colors.black,
                                  radius: 120,
                                  child: CircleAvatar(
                                    backgroundColor:
                                        Color.fromARGB(255, 255, 255, 255),
                                    radius: 115,
                                    backgroundImage:
                                        AssetImage('images/user2.png'),
                                  ),
                                ),
                              ),
                              profileText(user!.username, "Username"),
                              profileText(user!.email, "Email"),
                              profileText(user!.adresse, "Adresse"),
                              profileText(user!.role, "Role"),
                              Padding(
                                padding: const EdgeInsets.only(top: 15),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: <Widget>[
                                    Visibility(
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
                                            child: const Text('My Products'),
                                          ),
                                          Padding(
                                            padding:
                                                const EdgeInsets.only(left: 20),
                                            child: ElevatedButton(
                                              onPressed: () {
                                                setState(() {
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
                                  ],
                                ),
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
