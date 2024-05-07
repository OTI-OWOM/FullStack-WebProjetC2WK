import 'package:flutter/material.dart';
import 'package:projet_c2w/routes/routes.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: 'Elite Cars Vault',
      theme: ThemeData(
        primarySwatch: const MaterialColor(0xff7187bc, {
          50: Color(0xff667aa9), //10%
          100:Color(0xff5a6c96), //20%
          200:Color(0xff4f5f84), //30%
          300:Color(0xff445171), //40%
          400:Color(0xff39445e), //50%
          500:Color(0xff2d364b), //60%
          600:Color(0xff222838), //70%
          700:Color(0xff171b26), //80%
          800:Color(0xff0b0d13), //90%
          900:Color(0xff000000), //100%
        }),
      ),
      routerConfig: router,
    );
  }
}
