const store = require("../services/notesStorage.js");

module.exports.getNote = function (req, res) {
    store.getNote(req.params.id, function (err, note) {
        res.json(note);
    });
};

module.exports.getNotes = function (req, res) {
    store.getNotes(function (err, notes) {
        res.json(notes || {});
    })
};

module.exports.createNote = function (req, res) {
    let order = store.createNote(req.body, function (err, note) {
        res.json(note);
    });
};

module.exports.editNote = function (req, res) {
    let order = store.editNote(req.body, function (err, note) {
        res.json(note);
    });
};

module.exports.setDone = function (req, res) {
    let order = store.setDone(req.body, function (err, note) {
        res.json(note);
    });
};

module.exports.deleteNote = function (req, res) {
    //console.log(res);
    store.deleteNote(req.params.id, {}, function (err, note) {
        res.json(note);
    });
};