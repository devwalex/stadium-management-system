"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const moment = require("moment");

class Event extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to convert the amount to a well readable amount
     */
    this.addHook("afterFetch", (events) => {
      events.map((event) => {
        if (event.event_date) {
          event.event_date = moment(event.event_date).format("MMMM D, YYYY");
        }
        // if (event.event_time) {
        //   event.event_time = moment(event.event_time).format("h:mm");
        // }
      });
    });
  }
}

module.exports = Event;
