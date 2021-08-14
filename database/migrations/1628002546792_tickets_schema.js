"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TicketsSchema extends Schema {
  up() {
    this.create("tickets", (table) => {
      table.increments();
      table.string("ticket_reference");
      table.string("ticket_type");
      table.string("ticket_category");
      table.boolean("is_valid").defaultTo(false);
      table.string("space_number");
      table.integer("event_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("tickets");
  }
}

module.exports = TicketsSchema;
