"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.on("/").render("pages.index").as("home");
Route.on("/events").render("pages.events");
Route.on("/car-parking").render("pages.car-parking");
Route.on("/about").render("pages.about");
Route.on("/register").render("pages.register");
Route.on("/login").render("pages.login").as("loginView");
// Route.on("/dashboard").render("pages.admin.dashboard").as("dashboard");
Route.on("/add-new-event").render("pages.admin.add-event").as("addEventView");
Route.on("/print").render("pages.print-receipt").as("print");
// Route.on("/all-events").render("pages.admin.all-events").as("allEventsView");

Route.post("/register-user", "User/RegisterController.register").as("register");
Route.get("/", "User/HomeViewController.allEvent").as("home");
Route.post("/login-user", "Authentication/LoginController.authenticateUser").as(
  "login"
);
Route.post("/add-event", "Admin/EventController.addEvent")
  .as("addEvent")
  .middleware(["auth:session"]);

Route.post("/purchase-ticket", "User/PurchaseTicketController.purchaseTicket")
  .as("purchaseTicket")
  .middleware(["auth:session"]);

Route.get("/all-events", "Admin/EventController.allEvent")
  .as("allEventsView")
  .middleware(["auth:session"]);

Route.get("/all-tickets", "Admin/EventController.allTickets")
  .as("allTicketsView")
  .middleware(["auth:session"]);

Route.get("/print-receipt", "Admin/EventController.allTickets")
  .as("allTicketsView")
  .middleware(["auth:session"]);

Route.get("/dashboard", "Admin/DashboardController.analytics")
  .as("dashboard")
  .middleware(["auth:session"]);
Route.get("/logout", "Authentication/LogoutController.logOut").as("logout");
