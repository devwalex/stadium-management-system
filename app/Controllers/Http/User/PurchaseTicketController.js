"use strict";
const Ticket = use("App/Models/Ticket");
const Event = use("App/Models/Event");
const UserTicket = use("App/Models/UserTicket");
const randomString = require("randomstring");

class PurchaseTicketController {
  async purchaseTicket({ request, response, auth, session }) {
    try {
      const { event_id, ticket_count, ticket_type, ticket_category } =
        request.post();

      const authenticatedUserId = await auth.current.user.id;
      const event = await Event.findBy("id", event_id);

      const ticketSlotNumber =
        ticket_category == "Entry Ticket"
          ? event.event_entry_ticket_slot
          : event.event_car_parking_slot;

      for (let i = 0; i < ticket_count; i++) {
        const generateRandomNumber = randomString.generate({
          length: 5,
          charset: "numeric",
        });

        const ticketCategoryCode =
          ticket_category == "Entry Ticket" ? "ET" : "PT";
        const ticket = new Ticket();
        ticket.ticket_reference = `GWAS-${generateRandomNumber}-${ticketCategoryCode}`;
        ticket.ticket_type = ticket_type;
        ticket.ticket_category = ticket_category;
        ticket.is_valid = true;
        ticket.space_number = Math.floor(Math.random() * ticketSlotNumber) + 1;
        ticket.event_id = event.id;
        await ticket.save();

        const userTicket = new UserTicket();
        UserTicket.user_id = authenticatedUserId;
        UserTicket.ticket_id = ticket.id;
        await userTicket.save();
      }

      session.flash({
        notification: {
          type: "success",
          message: "Purchased Ticket Successful",
        },
      });
      // return response.redirect("back");

      return response.route("print");
    } catch (error) {
      console.error(`Purchase Ticket Failed`, error);
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

module.exports = PurchaseTicketController;
