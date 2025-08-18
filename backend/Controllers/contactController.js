const Contact = require("../Models/Contact");

// PUT /api/contact  → create or update contact
const saveContact = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const contact = await Contact.findOneAndUpdate(
      { email },
      { name, email },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ message: "Contact saved successfully", contact });
  } catch (err) {
    res.status(500).json({ message: "Server error solve it", error: err.message });
  }
};

// DELETE /api/contact/:email  → delete by email
const deleteContact = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Email is required to delete contact" });
    }

    const deleted = await Contact.findOneAndDelete({ email });

    if (!deleted) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully", deleted });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// assuming you have mongoose model

// GET all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};

module.exports = { saveContact, deleteContact, getContacts };
