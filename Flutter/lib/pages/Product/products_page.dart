import 'package:flutter/material.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_products_service.dart';

import '../../shared/partials/product.dart';

class Products extends StatefulWidget {
  const Products({super.key});

  @override
  State<Products> createState() => _ProductsState();
}

class _ProductsState extends State<Products> {
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
    // Verifies if we are looking for all the products from a certain user or just all the products.
      posts = await ApiProductsService().getProducts();
    setState(() {
      isLoaded = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
    );
  }
}
