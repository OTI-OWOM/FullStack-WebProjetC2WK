import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/pages/Product/create_product_page.dart';
import 'package:projet_c2w/pages/Product/product_modify_page.dart';
import 'package:projet_c2w/pages/Product/product_page.dart';
import 'package:projet_c2w/pages/Product/products_from_user.dart';
import 'package:projet_c2w/pages/Product/products_page.dart';
import 'package:projet_c2w/pages/User/login_page.dart';
import 'package:projet_c2w/pages/User/modify_user_page.dart';
import 'package:projet_c2w/pages/User/user_page.dart';
import 'package:projet_c2w/pages/error.dart';
import 'package:projet_c2w/pages/root_page.dart';
import 'package:projet_c2w/pages/home_page.dart';
import 'package:projet_c2w/shared/library.dart';

import '../pages/User/me_page.dart';
import '../pages/User/register_page.dart';
import '../pages/User/users_page.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _shellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'shell');

final GoRouter router = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/Home',
  routes: <RouteBase>[
    ShellRoute(
      navigatorKey: _shellNavigatorKey,
      pageBuilder: (context, state, child) =>
          NoTransitionPage(child: RootPage(childWidget: child)),
      routes: <RouteBase>[
        GoRoute(
          path: '/Home',
          pageBuilder: (context, state) => const NoTransitionPage(
            child: HomePage(),
          ),
        ),
        GoRoute(
          path: '/Profile',
          pageBuilder: (context, state) =>
              NoTransitionPage(child: const MePage(), key: UniqueKey()),
          redirect: (context, state) async {
            if (await isLoggedIn()) {
              return '/Login';
            }
            return null;
          },
        ),
        GoRoute(
            path: '/Users',
            pageBuilder: (context, state) =>
                NoTransitionPage(child: const UsersPage(), key: UniqueKey()),
            routes: [
              GoRoute(
                path: 'User/:id',
                parentNavigatorKey: _rootNavigatorKey,
                name: 'user',
                pageBuilder: (context, state) => NoTransitionPage(
                    child: UserPage(id: state.params['id']), key: UniqueKey()),
                redirect: (context, state) async {
                  if (await isLoggedIn()) {
                    return '/Login';
                  }
                  return null;
                },
              ),
            ]),
        GoRoute(
            path: '/Products',
            pageBuilder: (context, state) =>
                NoTransitionPage(child: const Products(), key: UniqueKey()),
            routes: [
              GoRoute(
                path: 'Product/:id',
                parentNavigatorKey: _rootNavigatorKey,
                name: 'product',
                pageBuilder: (context, state) => NoTransitionPage(
                    child: ProductPage(id: state.params['id']),
                    key: UniqueKey()),
                redirect: (context, state) async {
                  if (await isLoggedIn()) {
                    return '/Login';
                  }
                  return null;
                },
              ),
            ]),
      ],
    ),
    GoRoute(
      path: '/Login',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) =>
          NoTransitionPage(child: const LoginPage(), key: UniqueKey()),
    ),
    GoRoute(
      path: '/Error',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) =>
          const NoTransitionPage(child: ErrorPage()),
    ),
    GoRoute(
      path: '/Register',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) =>
          const NoTransitionPage(child: RegisterPage()),
    ),
    GoRoute(
      path: '/ProductsFromUser/:id',
      parentNavigatorKey: _rootNavigatorKey,
      name: 'productsUser',
      pageBuilder: (context, state) =>
          NoTransitionPage(child: ProductsFromUser(userId: state.params['id']), key: UniqueKey()),
    ),
    GoRoute(
      path: '/CreateProduct/:id',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) => NoTransitionPage(
          child: CreateProduct(
        userId: state.params['id'],
      )),
      redirect: (context, state) async {
        if (await isLoggedIn()) {
          return '/Login';
        }
        return null;
      },
    ),
    GoRoute(
      path: '/CreateProduct',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) =>
          const NoTransitionPage(child: LoginPage()),
    ),
    GoRoute(
      path: '/modify/:id',
      name: 'modify',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) => NoTransitionPage(
          child: ModifyUserPage(
        id: state.params['id'],
      )),
    ),
    GoRoute(
      path: '/modifyproduct/:id',
      name: 'modifyproduct',
      parentNavigatorKey: _rootNavigatorKey,
      pageBuilder: (context, state) => NoTransitionPage(
          child: ModifyProductPage(
        id: state.params['id'],
      )),
      redirect: (context, state) async {
        if (await isLoggedIn()) {
          return '/Login';
        }
        return null;
      },
    ),
  ],
);
