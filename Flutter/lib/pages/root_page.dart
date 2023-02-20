import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/shared/library.dart';

import '../shared/navbar.dart';

class RootPage extends StatefulWidget {
  const RootPage({super.key, required this.childWidget});
  final Widget childWidget;
  @override
  State<RootPage> createState() => _RootPageState();
}

class _RootPageState extends State<RootPage> {
  bool userLoggedIn = false;

  // The current user
  late String? userId = '';

  @override
  void initState() {
    super.initState();
    _getData();
  }

  void _getData() async {
    bool userLog = await isLoggedIn();
    if (!userLog) {
      userId = await currentUserId();
    }
    setState(() {
      userLoggedIn = userLog;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('images/detailed_cars.png'),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.center,
            end: Alignment.bottomCenter,
            colors: [Colors.black12, Colors.black87],
          ),
        ),
        child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            centerTitle: true,
            leading: GestureDetector(
                onTap: () => GoRouter.of(context).go('/Home'),
                child: Image.asset(
                  'images/logo.png',
                  scale: 10,
                )),
            actions: [
              userLoggedIn ? loginIcon(context) : logoutIcon(context),
            ],
            title: const Text('Elite Cars Vault'),
          ),
          body: widget.childWidget,
          floatingActionButton: FloatingActionButton(
            backgroundColor: const Color.fromARGB(255, 158, 160, 206),
            isExtended: true,
            onPressed: () =>
                GoRouter.of(context).push('/CreateProduct/$userId'),
            child: const Icon(Icons.add),
          ),
          bottomNavigationBar: BottomNavigationBar(
            showUnselectedLabels: false,
            backgroundColor: Colors.amber,
            selectedFontSize: 15,
            selectedIconTheme: const IconThemeData(
                color: Color.fromRGBO(133, 135, 188, 1), size: 35),
            selectedItemColor: const Color.fromRGBO(133, 135, 188, 1),
            selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
            unselectedIconTheme:
                const IconThemeData(color: Colors.black, size: 20),
            unselectedItemColor: Colors.black,
            unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
            unselectedFontSize: 12,
            items: tabs,
            onTap: (int index) {
              setState(() {
                if (index != _currentIndex) {
                  context.go(tabs[index].initialLocation);
                }
              });
            },
            currentIndex: _currentIndex,
          ),
        ),
      ),
    );
  }

  int get _currentIndex => _locationToTabIndex(GoRouter.of(context).location);

  int _locationToTabIndex(String location) {
    final index =
        tabs.indexWhere((t) => location.startsWith(t.initialLocation));
    // if index not found (-1), return 0
    return index < 0 ? 0 : index;
  }
}
