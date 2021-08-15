"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use("Database");
const Hash = use("Hash");
const Role = use("App/Models/Role");

class UserSeeder {
  async run() {
    // Hash Password
    const seedPassword = await Hash.make("admin");

    const adminRole = await Role.findBy("role_label", "Admin");

    await Database.raw("SET FOREIGN_KEY_CHECKS = 0;");
    await Database.truncate("users");

    // Insert User Role Into The Database
    await Database.table("users").insert([
      {
        first_name: "Stadium",
        last_name: "Admin",
        email: "admin@stadium.com",
        password: seedPassword,
        role_id: adminRole.id,
      },
    ]);

    await Database.raw("SET FOREIGN_KEY_CHECKS = 1;");
  }
}

module.exports = UserSeeder;
