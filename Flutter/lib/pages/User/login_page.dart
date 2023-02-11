import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/authentication_model.dart';

import '../../services/api_user_service.dart';
import '../../shared/library.dart';
import '../../shared/partials/forms.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // TextEditingController initialisers
  final email = TextEditingController();
  final password = TextEditingController();
  bool animationIcon = false;

  // GlobalKeys initialisers
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Visibility indicators initialisers
  bool isLoading = true;
  bool isLoggedIn = false;

  // Auth model initialiser
  late Auth? posts = const Auth(userId: '', token: '', message: '');

  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }

  /// Sends the email and password to verify if the user exists.
  ///
  /// Params :
  ///    - email - A string containing the email.
  ///    - password - A string containing the password.
  void _sendData(String email, String password) async {
    posts = await ApiUserService().login(email, password);
    Future.delayed(const Duration(milliseconds: 300)).then(
      (value) => setState(() {
        if (posts!.message == '') {
          setToken(posts: posts);
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
          title: const Text('Login Page'),
          leading: IconButton(
            onPressed: () => GoRouter.of(context).go('/Home'),
            icon: const Icon(Icons.arrow_back_ios),
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 20.0, vertical: 30),
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  decoration: const BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.all(Radius.circular(15))),
                  child: Form(
                    key: _formKey,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10.0, vertical: 30),
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
                          Container(
                            margin: const EdgeInsets.only(top: 15),
                            child: Text(
                              style: TextStyle(
                                color:
                                    isLoggedIn ? Colors.black : Colors.redAccent,
                              ),
                              isLoggedIn ? 'You are logged in' : posts!.message,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 8.0),
                            child: Visibility(
                              visible: isLoading,
                              replacement: const Center(
                                  child: CircularProgressIndicator()),
                              child: ElevatedButton(
                                onPressed: () {
                                  if (_formKey.currentState!.validate()) {
                                    setState(() {
                                      isLoading = false;
                                      _sendData(email.text, password.text);
                                    });
                                  }
                                },
                                child: const Text('Log in'),
                              ),
                            ),
                          ),
                          ElevatedButton(
                            onPressed: () => GoRouter.of(context).push('/Register'),
                            child: const Text('Register'),
                          )
                        ],
                      ),
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
