"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");
const Role = use("App/Models/Role");

class LoginController {
  async authenticateUser({ response, request, auth, session }) {
    try {
      const { email, password } = request.all();

      const findUser = await User.findBy("email", email);

      if (!findUser) {
        session.flash({
          notification: {
            type: "danger",
            message: "Incorrect Email or Password please try again!",
          },
        });
        return response.redirect("back");
      }

      // Check if the password is accurate
      const doesPasswordMatch = await Hash.verify(password, findUser.password);
      if (!doesPasswordMatch) {
        session.flash({
          notification: {
            type: "danger",
            message: "You entered an incorrect password. Please try again",
          },
        });
        return response.redirect("back");
      }

      await auth.attempt(email, password);
      session.flash({
        notification: {
          type: "success",
          message: "Logged In Successfully",
        },
      });
      const adminRole = await Role.findBy("role_label", "Admin");

      if (findUser.role_id == adminRole.id) {
        return response.route("dashboard");
      } else {
        return response.route("home");
      }
    } catch (error) {
      console.log("Authentication Error ==>", error);

      // Return error to user if issue exists with credentials
      session.flash({
        notification: {
          type: "danger",
          message: "Login Failed. Please try again!",
        },
      });

      return response.redirect("back");
    }
  }
}

module.exports = LoginController;
