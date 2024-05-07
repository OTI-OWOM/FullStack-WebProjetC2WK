import 'package:flutter/material.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_products_service.dart';

import '../../shared/partials/product.dart';

class ProductsFromUser extends StatefulWidget {
  const ProductsFromUser({super.key, this.userId = ''});
  final String? userId;

  @override
  State<ProductsFromUser> createState() => _ProductsFromUserState();
}

class _ProductsFromUserState extends State<ProductsFromUser> {
  // Visibility indicators initialisers
  bool isLoaded = false;

  // A list of all the products
  late List<ProductsModel>? posts = [];

  @override
  void initState() {
    super.initState();
    _getData();
  }

  /// Calls the getProducts from the ProductsServices
  void _getData() async {
    posts = await ApiProductsService().getProductsFromUser(widget.userId);
    setState(() {
      isLoaded = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.center,
          end: Alignment.bottomCenter,
          colors: [
            Color.fromARGB(255, 158, 160, 206),
            Colors.black87,
          ],
        ),
      ),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Products'),
          centerTitle: true,
        ),
        backgroundColor: Colors.white10,
        body: Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Visibility(
            visible: isLoaded,
            replacement: const Center(
              child: CircularProgressIndicator(),
            ),
            child: ListView.builder(
              itemCount: posts?.length,
              itemBuilder: (context, index) {
                return productCardDefault(posts, index, context);
              },
            ),
          ),
        ),
      ),
    );
  }
}
