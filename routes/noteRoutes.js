const express = require('express');
const router = express.Router();
const notes = require('../controller/noteController.js');

router.get("/note/:id/", notes.getNote);
router.get("/notes", notes.getNotes);
router.post("/note", notes.createNote);
router.put("/note/:id/", notes.editNote);
router.put("/note/:id/setDone", notes.setDone);
router.delete("/note/:id/delete", notes.deleteNote);

module.exports = router;