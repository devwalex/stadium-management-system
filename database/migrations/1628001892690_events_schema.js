"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EventsSchema extends Schema {
  up() {
    this.create("events", (table) => {
      table.increments();
      table.string("event_name");
      table.string("event_time");
      table.string("event_date");
      table.string("event_entry_regular_price");
      table.string("event_entry_vip_price");
      table.string("event_parking_regular_price");
      table.string("event_parking_vip_price");
      table.integer("event_entry_ticket_slot");
      table.integer("event_car_parking_slot");
      table.timestamps();
    });
  }

  down() {
    this.drop("events");
  }
}

module.exports = EventsSchema;
