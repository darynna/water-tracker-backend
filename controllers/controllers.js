const {Contact} = require("../models/contacts")

const {catchAsync, httpError} = require('../utilities')

exports.getAllContacts = catchAsync(async(req, res) =>{
    const { _id: owner } = req.user;
    const allContacts = await Contact.find({owner}).populate("owner", "email");
    res.status(200).json(allContacts)
} )

exports.getById = catchAsync(async(req, res)=>{
    const { _id: owner } = req.user;
    const {contactId} = req.params;
    const contact = await Contact.findOne({ _id: contactId, owner });
    if(!contact) throw httpError(404, 'Not found')
    res.status(200).json(contact)
})

exports.deleteContact = catchAsync(async (req, res)=>{
    const { _id: owner } = req.user;
    const {contactId} = req.params;
    const deletedContact = await Contact.findOneAndDelete({ _id: contactId, owner });
    if(!deletedContact) throw httpError(404, 'Not found')
    res.status(200).json({message: 'Contact was deleted!'})
});

exports.postContact = catchAsync(async(req, res)=>{
    const {_id: owner} = req.user;
    const newContact = await Contact.create({...req.body, owner});
    res.status(201).json(newContact);
})

exports.updateContact = catchAsync( async (req, res)=>{
    const { _id: owner } = req.user;
    const {contactId} = req.params;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if(!updatedContact){
        throw httpError(404, 'Not found')
    }
    res.status(200).json(updatedContact);

})
