import passport from "passport";
import {passportCallCurrent} from "../utils/utils.js";
import appRouter from "./router.js";
import {
  errorPageController,
  failLoginController,
  failRegisterController,
  githubCallbackController,
  loginGithubController,
  userCurrentController,
  userLoginController,
  userLogoutController,
  userRegisterController,
  viewLoginController,
  viewRegisterController,
} from "../controllers/userJWT.controller.js";

export default class JWTRouter extends appRouter {
  init() {
    this.post("/register", ["PUBLIC"],
      passport.authenticate("register", {
        session: false,
        failureRedirect: "/api/jwt/failRegister",
      }), userRegisterController);
    this.get("/failRegister", ["PUBLIC"], failRegisterController);
    //Vista para registrar usuarios por Formulario
    this.get("/register", ["PUBLIC"], viewRegisterController);

    // API Login con JWT
    this.post("/login", ["PUBLIC"],
      passport.authenticate("login", {
        session: false,
        failureRedirect: "/api/jwt/failLogin",
      }), userLoginController);
    this.get("/failLogin", ["PUBLIC"], failLoginController);
    // Vista de Login
    this.get("/login", ["PUBLIC"], viewLoginController);

    // Rutas para autentificacion por github
    this.get("/github", ["PUBLIC"],
      passport.authenticate("github", { scope: ["user:email"] }),
      loginGithubController);
    this.get("/githubcallback", ["PUBLIC"],
      passport.authenticate("github", { session: false }),
      githubCallbackController);

    // Eliminar JWT
    this.get("/logout", ["PUBLIC"], userLogoutController);
    this.get("/error", ["PUBLIC"], errorPageController);
    
    // Vista del Profile
    this.get("/current", ["PUBLIC"],
      passportCallCurrent("current"),
      userCurrentController
    );
  }
}
