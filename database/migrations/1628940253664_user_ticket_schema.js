"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserTicketSchema extends Schema {
  up() {
    this.create("user_tickets", (table) => {
      table.increments();
      table.integer("user_id");
      table.integer("ticket_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("user_tickets");
  }
}

module.exports = UserTicketSchema;
