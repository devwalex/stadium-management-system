"use strict";

class LogoutController {
  async logOut({ response, session, auth }) {
    try {
      await auth.logout();
      return response.route("loginView");
    } catch (error) {
      console.log("Logout Error => ", error);

      session.flash({
        notification: {
          type: "danger",
          message:
            "An error occurred in the process of terminating your session! Please Try Again.",
        },
      });
      return response.redirect("back");
    }
  }
}

module.exports = LogoutController;
