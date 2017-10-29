app.get(
    "/",
    HomeController.index
);

app.get(
    "/logout",
    AuthController.logout
);

app.get(
    "/profile",
    SessionAuth,
    HomeController.profile
);
