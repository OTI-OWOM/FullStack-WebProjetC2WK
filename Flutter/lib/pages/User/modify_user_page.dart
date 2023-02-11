import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/user_model.dart';
import 'package:projet_c2w/services/api_user_service.dart';

import '../../models/authentication_model.dart';
import '../../shared/partials/forms.dart';

class ModifyUserPage extends StatefulWidget {
  const ModifyUserPage({super.key, this.id = '', this.urlBack = ''});
  final String? id;
  final String? urlBack;

  @override
  State<ModifyUserPage> createState() => _ModifyUserPageState();
}

class _ModifyUserPageState extends State<ModifyUserPage> {
  // TextEditingController initialisers
  final email = TextEditingController();
  final password = TextEditingController();
  final username = TextEditingController();
  final adresse = TextEditingController();

  // GlobalKeys initialisers
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

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
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              isLoaded = true;
            }));
  }

  /// Sends the credentials to modify a user.
  ///
  /// Params :
  ///    - email - A string containing the email.
  ///    - password - A string containing the password.
  ///    - adresse - A string containing the adresse.
  ///    - username - A string containing the username.
  void _sendData(
      String email, String password, String username, String adresse) async {
    final modifications = <String, String>{
      "email": email,
      "password": password,
      "username": username,
      "adresse": adresse
    };
    modifications.removeWhere((key, value) => value == "");
    message = await ApiUserService().modifyUser(user!.id, modifications);
    Future.delayed(const Duration(milliseconds: 500))
        .then((value) => setState(() {
              isLoading = true;
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
          automaticallyImplyLeading: false,
          centerTitle: true,
          title: const Text('Modify User'),
          leading: IconButton(
              onPressed: () {
                if (widget.urlBack == 'user') {
                  GoRouter.of(context)
                      .goNamed(widget.urlBack ?? '', params: {'id': user!.id});
                } else {
                  GoRouter.of(context).go(widget.urlBack ?? '');
                }
              },
              icon: const Icon(Icons.arrow_back)),
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
                            radius: 120,
                            child: CircleAvatar(
                              backgroundColor:
                                  Color.fromARGB(255, 244, 230, 230),
                              radius: 115,
                              backgroundImage: AssetImage('images/user2.png'),
                            ),
                          ),
                        ),
                        Form(
                          key: _formKey,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: <Widget>[
                              formGeneralModify(email, 'Email', user!.email, '',
                                  readOnly: modify, floatLabel: false),
                              formGeneralModify(
                                  username, 'Username', user!.username, '',
                                  readOnly: modify, floatLabel: false),
                              formGeneralModify(
                                  adresse, 'Adresse', user!.adresse, '',
                                  readOnly: modify, floatLabel: false),
                              formGeneralModify(
                                  password, 'Password', user!.password, '',
                                  readOnly: modify, floatLabel: false),
                              Container(
                                margin: const EdgeInsets.only(top: 15),
                                child: Text(message!),
                              ),
                              Padding(
                                padding:
                                    const EdgeInsets.symmetric(vertical: 8.0),
                                child: Visibility(
                                  visible: isLoading,
                                  replacement: const Center(
                                      child: CircularProgressIndicator()),
                                  child: ElevatedButton(
                                    onPressed: () {
                                      if (_formKey.currentState!.validate()) {
                                        setState(() {
                                          message = '';
                                          isLoading = false;
                                          _sendData(email.text, password.text,
                                              username.text, adresse.text);
                                        });
                                      }
                                    },
                                    child: const Text('Modify'),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
