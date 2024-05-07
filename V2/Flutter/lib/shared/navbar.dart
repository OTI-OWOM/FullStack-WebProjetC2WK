import 'package:flutter/material.dart';

class ScaffoldWithNavBarTabItem extends BottomNavigationBarItem {
  const ScaffoldWithNavBarTabItem(
      {required this.initialLocation, required Widget icon, String? label})
      : super(icon: icon, label: label);

  /// The initial location/path
  final String initialLocation;
}

/// The list for the bottom navabar items
List<ScaffoldWithNavBarTabItem> tabs = [
  const ScaffoldWithNavBarTabItem(
    initialLocation: '/Home',
    icon: Icon(Icons.home),
    label: 'Home',
  ),
  const ScaffoldWithNavBarTabItem(
    initialLocation: '/Profile',
    icon: Icon(Icons.person),
    label: 'Profile',
  ),
  const ScaffoldWithNavBarTabItem(
    initialLocation: '/Users',
    icon: Icon(Icons.people),
    label: 'Users',
  ),
  const ScaffoldWithNavBarTabItem(
    initialLocation: '/Products',
    icon: Icon(Icons.drive_eta),
    label: 'Products',
  ),
];
