import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:projet_c2w/models/products_model.dart';

/// Creates a custom card for the products.
///
/// Params :
///    - posts - A List of products.
///    - index - An integer indication the index
///    - context - A BuildContext used for routing
///
/// Return : A custom card for the products.
Card productCardDefault(
    List<ProductsModel>? posts, int index, BuildContext context) {
  return Card(
    color: const Color.fromARGB(222, 255, 255, 255),
    elevation: 5.0,
    margin: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
    child: ListTile(
      title: Text(
        posts![index].name,
        style:
            const TextStyle(fontWeight: FontWeight.bold, color: Colors.black),
      ),
      leading: Container(
        padding: const EdgeInsets.only(right: 12.0, bottom: 15),
        decoration: const BoxDecoration(
          border: Border(right: BorderSide(width: 1.0, color: Colors.black)),
        ),
        child: const Padding(
          padding: EdgeInsets.only(top: 15),
          child: Icon(
            Icons.directions_car_outlined,
            color: Colors.black,
          ),
        ),
      ),
      contentPadding:
          const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
      horizontalTitleGap: 10,
      onTap: () => GoRouter.of(context)
          .goNamed('product', params: {'id': posts[index].id}),
      trailing: const Icon(Icons.keyboard_arrow_right),
      subtitle: Row(
        children: [
          Text(
            posts[index].description,
            style: const TextStyle(color: Colors.black),
          )
        ],
      ),
    ),
  );
}

/// Creates a custom Text field for the different parameters of a product.
///
/// Params :
///    - product - The name of the product.
///    - header - The header
///
/// Return : A custom Text field.
Column productText(String? product, String header) {
  return Column(
    children: [
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            header,
            style: const TextStyle(
                fontSize: 15, fontWeight: FontWeight.w500, color: Colors.grey),
          ),
          const SizedBox(
            height: 1,
          ),
          Container(
            width: 350,
            height: 40,
            decoration: const BoxDecoration(
                border: Border(
                    bottom: BorderSide(
              color: Colors.grey,
              width: 1,
            ))),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Text(
                    product!,
                    style: const TextStyle(
                        fontSize: 18, height: 1.8, color: Colors.black),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    ],
  );
}