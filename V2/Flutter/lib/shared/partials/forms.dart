import 'package:flutter/material.dart';

/// Creates a custom general form to be used when we want to modify something.
///
/// Params :
///    - controller - A TextEditingController.
///    - label - The label user in the decorator.
///    - textHint - The text hint.
///    - errorMessage - The error message.
///
/// Return : A custom card for the products.
Padding formGeneralModify(TextEditingController controller, String label,
    String textHint, String errorMessage,
    {bool isPrx = false,
    Icon prefixIcon = const Icon(Icons.abc),
    bool floatLabel = true,
    bool readOnly = false,
    TextInputType inputType = TextInputType.text}) {
  return Padding(
    padding: const EdgeInsets.all(2.0),
    child: TextFormField(
      keyboardType: inputType,
      readOnly: readOnly,
      controller: controller,
      decoration: inputFormDecoration(label,
          prfIcon: isPrx,
          prefIcon: prefixIcon,
          textHint: textHint,
          floatLabel: floatLabel),
    ),
  );
}

/// Creates a custom general form to be used.
///
/// Params :
///    - controller - A TextEditingController.
///    - label - The label user in the decorator.
///    - textHint - The text hint.
///    - errorMessage - The error message.
///
/// Return : A custom card for the products.
Padding formGeneral(TextEditingController controller, String label,
    String textHint, String errorMessage,
    {bool isPrx = false,
    Icon prefixIcon = const Icon(Icons.abc),
    bool floatLabel = true,
    bool readOnly = false, 
    TextInputType inputType = TextInputType.text}) {
  return Padding(
    padding: const EdgeInsets.all(4.0),
    child: TextFormField(
      keyboardType: inputType,
      readOnly: readOnly,
      controller: controller,
      decoration: inputFormDecoration(label,
          prfIcon: isPrx,
          prefIcon: prefixIcon,
          textHint: textHint,
          floatLabel: floatLabel),
      validator: (String? value) {
        if (value == null || value.isEmpty) {
          return errorMessage;
        }
        return null;
      },
    ),
  );
}

/// Creates a custom general form to be used for passwords.
///
/// Params :
///    - controller - A TextEditingController.
///    - label - The label user in the decorator.
///    - textHint - The text hint.
///    - errorMessage - The error message.
///
/// Return : A custom card for the products.
Padding formGeneralPassword(
    TextEditingController controller, String label, String errorMessage,
    {bool isPrx = false, Icon prefixIcon = const Icon(Icons.abc)}) {
  return Padding(
    padding: const EdgeInsets.all(4.0),
    child: TextFormField(
      controller: controller,
      obscureText: true,
      enableSuggestions: false,
      autocorrect: false,
      decoration:
          inputFormDecoration(label, prfIcon: isPrx, prefIcon: prefixIcon),
      validator: (String? value) {
        if (value == null || value.isEmpty) {
          return errorMessage;
        }
        return null;
      },
    ),
  );
}

/// Creates a custom input decoration. Used for the forms
///
/// Params :
///    - text - The text to display (most of the time the value of the field we want to modify).
///    - textHint - The text hint.
///    - prfIcon - The prefix Widget
///    - floatLabel - A boolean used for the floatingLabelBehavior.
///
/// Return : A custom card for the products.
InputDecoration inputFormDecoration(String text,
    {String textHint = '',
    bool prfIcon = false,
    Widget? prefIcon = const Text('test'),
    bool floatLabel = true}) {
  return InputDecoration(
    floatingLabelBehavior:
        floatLabel ? FloatingLabelBehavior.auto : FloatingLabelBehavior.always,
    labelStyle: const TextStyle(
      letterSpacing: 0.5,
    ),
    contentPadding: const EdgeInsets.all(3),
    prefixIcon: prfIcon ? prefIcon : null,
    label: Text(text, style: const TextStyle(color: Colors.black)),
    hintText: textHint,
  );
}