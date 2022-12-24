const Bans = require("../models/tutorial.model.js");

// Create and Save a new Bans
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Bans
  const tutorial = new Bans({
    player: req.body.player,
    reason: req.body.reason,
    ban_id: req.body.ban_id,
    banner: req.body.banner,
    active: req.body.active || false,
    banned_date: req.body.banned_date,
    ban_expiration: req.body.ban_expiration
  });

  // Save Bans in the database
  Bans.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ban."
      });
    else res.send(data);
  });
};

// Retrieve all Banss from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Bans.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bans."
      });
    else res.send(data);
  });
};

// Find a single Bans by Id
exports.findOne = (req, res) => {
  Bans.findByNickname(req.params.player, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with name ${req.params.player}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Player with name " + req.params.player
        });
      }
    } else res.send(data);
  });
};

// find all published Bans
exports.findAllPublished = (req, res) => {
  Bans.getAllActive((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    else res.send(data);
  });
};

// Update a Bans identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Bans.updateByNickname(
    req.params.id,
    new Bans(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Player with name ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Player with name " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Bans with the specified id in the request
exports.delete = (req, res) => {
  Bans.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with name ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Player with name " + req.params.id
        });
      }
    } else res.send({ message: `Player was deleted successfully!` });
  });
};

// Delete all Banss from the database.
exports.deleteAll = (req, res) => {
  Bans.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all players."
      });
    else res.send({ message: `All Players|Bans were deleted successfully!` });
  });
};
