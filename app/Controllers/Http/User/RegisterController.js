"use strict";

const User = use("App/Models/User");
const Role = use("App/Models/Role");
class RegisterController {
  async register({ response, request, session }) {
    try {
      const { first_name, last_name, email, password } = request.post();

      const findRole = await Role.findBy("role_label", "User");

      if (!findRole) {
        session.flash({
          notification: {
            type: "danger",
            message: "Registration Failed",
          },
        });
        return response.redirect("back");
      }

      const user = new User();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.password = password;
      user.role_id = findRole.id;

      await user.save();

      session.flash({
        notification: {
          type: "success",
          message: "Registration is Successful",
        },
      });
      return response.redirect("back");
    } catch (error) {
      console.error(`User Registration Failed`, error);
      session.flash({
        notification: {
          type: "danger",
          message: "An unexpected error occurred.",
        },
      });
      return response.redirect("back");
    }
  }
}

module.exports = RegisterController;
