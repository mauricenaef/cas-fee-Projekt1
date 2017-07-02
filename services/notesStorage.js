const Datastore = require('nedb');
const db = new Datastore({
    filename: './data/notes.db', 
    autoload: true
});

let getNotes = function (callback) {
    db.find({}, function (err, notes) {
        callback(err, notes);

    });
};

let createNote = function (note, callback) {
    note.createdDate = Math.floor(new Date().getTime() / 1000);
    db.insert(note, function (err, newNote) {
        if (callback) {
            callback(err, newNote);
        }
    });
};

let getNote = function (id, callback) {
    db.findOne({_id: id}, function (err, note) {
        callback(err, note);
    });
};

let editNote = function (note, callback) {
    db.update({_id: note._id}, note, {}, function (err, newData) {
        callback(err, note);
    });
};

let deleteNote = function (id, callback) {
    db.remove({_id: id}, callback);
};

let setDone = function (note, callback) {
    getNote(note._id, function (err, newNote) {
        newNote.done = note.done ? true : false;
        newNote.doneDate = (note.done === true)  ? Math.floor(new Date().getTime() / 1000) : '';
        editNote(newNote, callback);
    });
};

module.exports = {
    getNote,
    getNotes,
    createNote,
    editNote,
    deleteNote,
    setDone
};