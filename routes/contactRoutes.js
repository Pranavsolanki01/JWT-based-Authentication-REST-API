const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updatedContact,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").get(getContacts);

router.route("/").post(createContact);

// router.route("/:id").get(getContact).put(updatedContact).delete(deleteContact);

// we also done the router of the same kind like
// router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updatedContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
