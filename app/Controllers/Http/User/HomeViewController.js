"use strict";
const Event = use("App/Models/Event");

class HomeViewController {
  async allEvent({ view, response, session }) {
    try {
      const events = await Event.all();
      // console.log("events", events.toJSON());
      return view.render("pages.index", {
        events: events.toJSON(),
      });
    } catch (error) {
      console.error(`Home View Failed`, error);
      session.flash({
        dashboardNotification: {
          type: "danger",
          message: "An unexpected error occurred.",
        },
      });
      return response.redirect("back");
    }
  }
}

module.exports = HomeViewController;
