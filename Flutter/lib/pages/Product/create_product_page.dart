import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_products_service.dart';

import '../../shared/partials/forms.dart';

class CreateProduct extends StatefulWidget {
  const CreateProduct({super.key, this.userId});
  final String? userId;

  @override
  State<CreateProduct> createState() => _CreateProductState();
}

class _CreateProductState extends State<CreateProduct> {
  // TextEditingController initialisers
  final name = TextEditingController();
  final price = TextEditingController();
  final description = TextEditingController();

  // GlobalKeys initialisers
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  // Visibility indicators initialisersS
  bool isLoading = true;
  bool isLoggedIn = false;

  // A message that indicates the state of the widget
  String? message = '';
  String thePrice = '';

  @override
  void dispose() {
    name.dispose();
    price.dispose();
    description.dispose();
    super.dispose();
  }

  /// Sends a ProductsModel to the ProductsServices, in order to create a product.
  ///
  /// Params :
  ///    - product - A ProductModel containing the new product.
  void _sendData(ProductsModel product) async {
    message = await ApiProductsService().createProduct(product);
    Future.delayed(const Duration(milliseconds: 300)).then(
      (value) => setState(() {
        if (message == 'Product added !') {
          message = "";
          GoRouter.of(context).pop();
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
          colors: [Color.fromARGB(255, 158, 160, 206), Colors.black87],
        ),
      ),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          title: const Text('Create a product'),
          centerTitle: true,
        ),
        body: Center(
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
                      Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: <Widget>[
                            Padding(
                              padding:
                                  const EdgeInsets.only(bottom: 30, top: 10),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(24),
                                child: Image.asset('images/voiture.png',
                                    width: 300),
                              ),
                            ),
                            formGeneral(name, 'Name', 'Enter the name', ''),
                            formGeneral(price, 'Price', 'Enter the price', '',
                                inputType: TextInputType.number),
                            formGeneral(description, 'Description',
                                'Enter the description', ''),
                            Container(
                              margin: const EdgeInsets.only(top: 15),
                              child: Text(
                                style: const TextStyle(color: Colors.red),
                                message!,
                              ),
                            ),
                            Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 8.0),
                              child: Visibility(
                                visible: isLoading,
                                replacement: const Center(
                                    child: CircularProgressIndicator()),
                                child: ElevatedButton(
                                  onPressed: () {
                                    if (_formKey.currentState!.validate()) {
                                      setState(() {
                                        isLoading = false;
                                        if (price.text.contains(',')) {
                                          thePrice = price.text.split(',').join();
                                        }
                                        if (price.text.contains('.')) {
                                          thePrice = price.text.split('.').join();
                                        }
                                        _sendData(ProductsModel(
                                            id: "",
                                            price: num.parse(thePrice),
                                            name: name.text,
                                            userId: widget.userId,
                                            description: description.text,
                                            v: 0));
                                      });
                                    }
                                  },
                                  child: const Text('Create'),
                                ),
                              ),
                            )
                          ],
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
    );
  }
}
