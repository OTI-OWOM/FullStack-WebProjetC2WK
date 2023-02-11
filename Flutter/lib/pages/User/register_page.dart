import 'package:flutter/material.dart';
import 'package:projet_c2w/models/authentication_model.dart';
import 'package:projet_c2w/models/user_model.dart';

import '../../services/api_user_service.dart';
import '../../shared/library.dart';
import '../../shared/partials/forms.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  // TextEditingController initialisers
  final email = TextEditingController();
  final password = TextEditingController();
  final username = TextEditingController();
  final adresse = TextEditingController();

  // GlobalKeys initialisers
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Visibility indicators initialisers
  bool isLoading = true;
  bool isLoggedIn = false;

  // A message that indicates the state of the widget
  String? message = '';

  // Auth model initialiser
  late Auth? tokenNewUser;

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    username.dispose();
    adresse.dispose();
    super.dispose();
  }

  /// Sends a UserModel to the UserServices, in order to register a user.
  ///
  /// Params :
  ///    - user - A UserModel containing the new user.
  void _sendData(UserModel user) async {
    message = await ApiUserService().registerUser(user);
    tokenNewUser = await ApiUserService().login(user.email, user.password);
    Future.delayed(const Duration(milliseconds: 500)).then(
      (value) => setState(() {
        if (message == 'User created !') {
          setToken(posts: tokenNewUser);
          isLoggedIn = true;
        }
        isLoading = true;
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.center,
          end: Alignment.bottomCenter,
          colors: [
            Color.fromARGB(255, 93, 161, 216),
            Colors.black87,
          ],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          centerTitle: true,
          title: const Text('Create an account'),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 30),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  decoration: const BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.all(Radius.circular(15))),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        formGeneral(
                          email,
                          'Email',
                          'Enter your email',
                          'Please enter an email',
                        ),
                        formGeneralPassword(
                          password,
                          'Password',
                          'Please enter an password',
                        ),
                        formGeneral(
                          username,
                          'Username',
                          'Enter your username',
                          'Please enter an username',
                        ),
                        formGeneral(
                          adresse,
                          'Adresse',
                          'Enter your adresse',
                          'Please enter an adresse',
                        ),
                        Container(
                          margin: const EdgeInsets.only(top: 15),
                          child: Text(
                            style: TextStyle(
                              color: isLoggedIn ? Colors.black : Colors.black,
                            ),
                            isLoggedIn ? 'You are signed up' : message!,
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.only(top: 50, bottom: 20),
                          child: Visibility(
                            visible: isLoading,
                            replacement:
                                const Center(child: CircularProgressIndicator()),
                            child: ElevatedButton(
                              onPressed: () {
                                if (_formKey.currentState!.validate()) {
                                  setState(() {
                                    isLoading = false;
                                    _sendData(UserModel(
                                        id: "",
                                        username: username.text,
                                        password: password.text,
                                        role: "",
                                        email: email.text,
                                        adresse: adresse.text));
                                  });
                                }
                              },
                              child: const Text('Register'),
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
