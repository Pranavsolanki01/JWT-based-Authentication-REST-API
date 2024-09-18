// we need to import the express async handler for the handling async function while using DB {4"5"0}
// it also allow and relife the again and again written of the async and await
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contact
//@route GET/api/contact
//@access public
//@access private <- after adding the user_id in Schema and making accessible only by bearer token
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST/api/contact
//@access public
//@access private <- after adding the user_id in Schema and making accessible only by bearer token
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are maindetory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  // console.log("The data recived form the client is", req.body);
  res.status(201).json(contact);
});

//@desc Get individual contact
//@route GET/api/contact/:id
//@access public
//@access private <- after adding the user_id in Schema and making accessible only by bearer token
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  //console.log("getContact called with id:", req.params.id);

  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT/api/contact/:id
//@access public
//@access private <- after adding the user_id in Schema and making accessible only by bearer token
const updatedContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: false }
  );

  res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE/api/contact/:id
//@access public
//@access private <- after adding the user_id in Schema and making accessible only by bearer token
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  // if (!contact) {
  //   res.status(404);
  //   throw new Error("Contact not found");
  // }

  // await Contact.remove();
  res.status(200).json({ message: `Contact removed for id ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updatedContact,
  deleteContact,
};
