import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/products_model.dart';
import 'package:projet_c2w/services/api_products_service.dart';
import 'package:projet_c2w/services/api_user_service.dart';

import '../../models/user_model.dart';
import '../../shared/partials/forms.dart';

class ModifyProductPage extends StatefulWidget {
  const ModifyProductPage({super.key, this.id = '', this.urlBack = ''});
  final String? id;
  final String? urlBack;

  @override
  State<ModifyProductPage> createState() => _ModifyProductPageState();
}

class _ModifyProductPageState extends State<ModifyProductPage> {
  // TextEditingController initialisers
  final userId = TextEditingController();
  final name = TextEditingController();
  final price = TextEditingController();
  final description = TextEditingController();

  // A Map that will contain the modifications
  Map userModification = {};

  // The current user
  late UserModel? user;

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
    Future.delayed(const Duration(milliseconds: 300))
        .then((value) => setState(() {
              if (user!.role != 'admin' && user!.id != product!.userId) {
                GoRouter.of(context).go('/Error');
              } else {
                isLoaded = true;
              }
            }));
  }

  /// Sends the credentials to modify a product.
  ///
  /// Params :
  ///    - name - A string containing the name.
  ///    - price - A num containing the price.
  ///    - description - A string containing the description.
  void _sendData(String name, String price, String description) async {
    final modifications = <String, dynamic>{
      "name": name == '' ? product!.name : name,
      "price": price == '' ? product!.price : num.parse(price),
      "description": description == '' ? product!.description : description,
    };
    await ApiProductsService().modifyProduct(product!.id, modifications);
    Future.delayed(const Duration(milliseconds: 300))
        .then((value) => setState(() {
              GoRouter.of(context).pop();
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
          centerTitle: true,
          title: const Text('Product'),
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
                        Form(
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
                              formGeneral(name, 'Name', product!.name, '',
                                  floatLabel: false),
                              formGeneral(
                                  price, 'Price', (product!.price/100).toString(), '',
                                  floatLabel: false,
                                  inputType: TextInputType.number),
                              formGeneral(description, 'Description',
                                  product!.description, '',
                                  floatLabel: false),
                              Padding(
                                padding: const EdgeInsets.only(top: 50.0),
                                child: Visibility(
                                  visible: isLoading,
                                  replacement: const Center(
                                      child: CircularProgressIndicator()),
                                  child: ElevatedButton(
                                    onPressed: () {
                                      setState(() {
                                        isLoading = false;
                                        if (price.text.contains(',')) {
                                          price.text = price.text.split(',').join();
                                        }
                                        _sendData(name.text, price.text,
                                            description.text);
                                      });
                                    },
                                    child: const Text('Modify'),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        )
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
