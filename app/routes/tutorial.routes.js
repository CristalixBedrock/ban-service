module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const mutes = require("../controllers/mutes.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/bans/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/bans/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/bans/active", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/bans/:player", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/bans/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/bans/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/bans/", tutorials.deleteAll);

  
  // MUTES

  router.post("/mutes/", mutes.create);

  // Retrieve all Tutorials
  router.get("/mutes/", mutes.findAll);

  // Retrieve all published Tutorials
  router.get("/mutes/active", mutes.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/mutes/:player", mutes.findOne);

  // Update a Tutorial with id
  router.put("/mutes/:id", mutes.update);

  // Delete a Tutorial with id
  router.delete("/mutes/:id", mutes.delete);

  // Delete all Tutorials
  router.delete("/mutes/", mutes.deleteAll);

  app.use('/api', router);
};
