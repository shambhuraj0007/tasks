const express = require("express");
const router = express.Router();
const { getContacts, saveContact, deleteContact } = require("../Controllers/contactController");

router.get("/contacts", getContacts);
router.put("/contact", saveContact);
router.delete("/contact/:email", deleteContact);

module.exports = router;