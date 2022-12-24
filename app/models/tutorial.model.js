const sql = require("./db.js");

// constructor
const Bans = function (tutorial) {
  this.player = tutorial.player;
  this.reason = tutorial.reason;
  this.ban_id = tutorial.ban_id;
  this.banner = tutorial.banner;
  this.active = tutorial.active;
  this.banned_date = tutorial.banned_date;
  this.ban_expiration = tutorial.ban_expiration;
};

Bans.create = (newTutorial, result) => {
  sql.query("INSERT INTO bans SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Bans.findByNickname = (id, result) => {
  sql.query("SELECT * FROM bans WHERE player='" + id + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Bans.getAll = (title, result) => {
  let query = "SELECT * FROM bans";

  if (title) {
    query += ` WHERE player LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bans: ", res);
    result(null, res);
  });
};

Bans.getAllActive = result => {
  sql.query("SELECT * FROM bans WHERE active=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("bans: ", res);
    result(null, res);
  });
};

Bans.updateByNickname = (player, tutorial, result) => {
  sql.query(
    "UPDATE bans SET player = ?, reason = ?, ban_id = ?, banner = ?, active = ?, banned_date = ?, ban_expiration = ? WHERE player = ?",
    [tutorial.player, tutorial.reason, tutorial.ban_id, tutorial.banner, tutorial.active, tutorial.banned_date, tutorial.ban_expiration, player],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { player: player, ...tutorial });
      result(null, { player: player, ...tutorial });
    }
  );
};

Bans.remove = (player, result) => {
  sql.query("DELETE FROM bans WHERE player = ?", player, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with name: ", player);
    result(null, res);
  });
};

Bans.removeAll = result => {
  sql.query("DELETE FROM bans", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} bans`);
    result(null, res);
  });
};

module.exports = Bans;