class Auth {
  final String userId;
  final String token;
  final String message;

  const Auth({required this.userId, required this.token, required this.message});

  factory Auth.fromJson(Map<String, dynamic> json) {
    return Auth(
      userId: json.containsKey("userId") ? json['userId'] : '',
      token: json.containsKey("token") ? json['token'] : '',
      message: json.containsKey("message") ? json['message'] : '',
    );
  }
}
