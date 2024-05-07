import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 120),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 80),
            decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.center,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color.fromARGB(255, 86, 89, 177),
                    Color.fromRGBO(133, 135, 188, 0.9)
                  ],
                ),
                color: Colors.white,
                borderRadius: BorderRadius.all(Radius.circular(20))),
            child: const Text(
              'Home Page',
              style: TextStyle(
                color: Colors.white,
                fontSize: 30,
                fontFamily: 'AlegreyaSansSC',
              ),
            ),
          ),
        ),
      ],
    );
  }
}
