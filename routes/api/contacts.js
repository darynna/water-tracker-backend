const express = require('express')
const {    
  getAllContacts,
  getById,
  deleteContact,
  postContact,
  updateContact,
} = require('../../controllers')

const {bodyValidation, updateFavoriteValidation} = require('../../utilities')
const {validateBody, isValidId, isEmptyReqBody, authantication} = require("../../middleware")

const router = express.Router()

router.get('/',authantication, getAllContacts)

router.get('/:contactId',authantication, isValidId, getById)

router.post('/',authantication, validateBody(bodyValidation), postContact)

router.delete('/:contactId',authantication, isValidId, deleteContact)

router.put('/:contactId',authantication, isValidId, isEmptyReqBody, validateBody(bodyValidation), updateContact)

router.patch('/:contactId/favorite', authantication, isValidId, validateBody(updateFavoriteValidation), updateContact)

module.exports = router