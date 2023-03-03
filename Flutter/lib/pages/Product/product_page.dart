import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_products_service.dart';

import '../../models/user_model.dart';
import '../../services/api_user_service.dart';
import '../../shared/partials/product.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({super.key, this.id = ''});
  final String? id;

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  // TextEditingController initialisers
  final userId = TextEditingController();
  final name = TextEditingController();
  final price = TextEditingController();
  final description = TextEditingController();

  // A Map that will contain the modifications
  Map userModification = {};

  // A message that indicates the state of the widget
  String? message = '';

  // The current user
  late UserModel? user;
  late UserModel? currentUser;

  // Visibility indicators initialisers
  bool isLoaded = false;
  bool isLoading = true;

  // The current product
  late ProductsModel? product;

  // Auth model initialiser

  @override
  void dispose() {
    name.dispose();
    userId.dispose();
    price.dispose();
    description.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _getData();
  }

  /// Gets the product that is searched and adds it to a product varibale.
  void _getData() async {
    product = await ApiProductsService().getProduct(productId: widget.id);
    user = await ApiUserService().getUser(isMe: true);
    currentUser = await ApiUserService().getUser(userId: product!.userId);
    Future.delayed(const Duration(milliseconds: 300))
        .then((value) => setState(() {
              isLoaded = true;
            }));
  }

  /// Calls the delete method from the UserServices
  void _deleteProduct() async {
    message = await ApiProductsService().deleteProduct(product!.id);
    Future.delayed(const Duration(milliseconds: 300))
        .then((value) => setState(() {
              if (user!.role == 'admin' || user!.id == product!.userId) {
                isLoaded = true;
                GoRouter.of(context).pop();
              } else {
                GoRouter.of(context).go('/Error');
              }
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
          title: const Text('Product'),
          centerTitle: true,
          actions: [
            IconButton(
                onPressed: () => GoRouter.of(context).pushNamed('modifyproduct',
                    params: {'id': product!.id}),
                icon: const Icon(Icons.edit))
          ],
        ),
        body: Visibility(
          visible: isLoaded,
          replacement: const Center(
            child: CircularProgressIndicator(),
          ),
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
                        Column(
                          children: [
                            Padding(
                              padding:
                                  const EdgeInsets.only(bottom: 30, top: 10),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(24),
                                child: Image.asset('images/voiture.png',
                                    width: 300),
                              ),
                            ),
                            productText(product!.name, 'Name'),
                            productText((product!.price/100).toString(), 'Price'),
                            productText(product!.description, 'Descriptions'),
                          ],
                        ),
                        Padding(
                          padding: const EdgeInsets.all(30.0),
                          child: Visibility(
                            visible: isLoading,
                            replacement: const Center(
                              child: CircularProgressIndicator(),
                            ),
                            child: ElevatedButton(
                                onPressed: () {
                                  setState(() {
                                    message = '';
                                    isLoading = false;
                                    _deleteProduct();
                                  });
                                },
                                child: const Text('Delete'),
                              ),
                          ),
                        ),
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
