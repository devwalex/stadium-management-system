"use strict";
const Event = use("App/Models/Event");
class EventController {
  async addEvent({ request, response, session }) {
    try {
      const {
        event_name,
        event_time,
        event_date,
        event_entry_regular_price,
        event_entry_vip_price,
        event_parking_regular_price,
        event_parking_vip_price,
        event_entry_ticket_slot,
        event_car_parking_slot,
      } = request.post();

      const event = new Event();
      event.event_name = event_name;
      event.event_time = event_time;
      event.event_date = event_date;
      event.event_entry_regular_price = event_entry_regular_price;
      event.event_entry_vip_price = event_entry_vip_price;
      event.event_parking_regular_price = event_parking_regular_price;
      event.event_parking_vip_price = event_parking_vip_price;
      event.event_entry_ticket_slot = event_entry_ticket_slot;
      event.event_car_parking_slot = event_car_parking_slot;

      await event.save();

      session.flash({
        dashboardNotification: {
          type: "success",
          message: "Event Added Successful",
        },
      });
      return response.redirect("back");
    } catch (error) {
      console.error(`Add Event Failed`, error);
      session.flash({
        dashboardNotification: {
          type: "danger",
          message: "An unexpected error occurred.",
        },
      });
      return response.redirect("back");
    }
  }

  async allEvent({ view, response, session }) {
    try {
      const events = await Event.all();
      // console.log("events", events.toJSON());
      return view.render("pages.admin.all-events", {
        // userRole,
        events: events.toJSON(),
      });

      session.flash({
        dashboardNotification: {
          type: "success",
          message: "Event Added Successful",
        },
      });
      return response.redirect("back");
    } catch (error) {
      console.error(`Add Event Failed`, error);
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

module.exports = EventController;
