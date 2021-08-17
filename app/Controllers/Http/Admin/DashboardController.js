"use strict";
const Event = use("App/Models/Event");
const Ticket = use("App/Models/Ticket");
const User = use("App/Models/User");

class DashboardController {
  async analytics({ view, response, session }) {
    try {
      const eventCount = await Event.getCount();
      const entryTicketCount = await Ticket.query()
        .where("ticket_category", "Entry Ticket")
        .getCount();
      const parkingTicketCount = await Ticket.query()
        .where("ticket_category", "Parking Ticket")
        .getCount();

      const userCount = await User.getCount();

      // console.log("events", events.toJSON());
      return view.render("pages.admin.dashboard", {
        eventCount: eventCount,
        entryTicketCount: entryTicketCount,
        parkingTicketCount: parkingTicketCount,
        userCount: userCount,
      });
    } catch (error) {
      console.error(`Dashboard View Failed`, error);
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

module.exports = DashboardController;
