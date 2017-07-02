;(function (services, $) {

    const ajaxUtil = window.util.ajax;

    function createNote( title, description, dueDate, priority, createdDate ) {
        return ajaxUtil.ajax("POST", "/note/", {
            title: title,
            done: false,
            description: description,
            dueDate: dueDate,
            priority: priority,
            createdDate: createdDate
        });
    }

    function getNote( id ) {
        return ajaxUtil.ajax("GET", "/note/" + id, undefined);
    }

    function getNotes() {
        return ajaxUtil.ajax("GET", "/notes/", undefined);
    }

    function editNote( id, title, done, description, priority, createdDate, dueDate ) {
        return ajaxUtil.ajax("PUT", "/note/" + id, {
            _id: id,
            title: title,
            done: false,
            description: description,
            priority: priority,
            createdDate: createdDate,
            dueDate: dueDate,
        });
    }

    function setDone( id, status ) {
        return ajaxUtil.ajax("PUT", "/note/" + id + "/setDone", {
            _id: id,
            done: status,
            doneDate: Date.now()
        });
    }

    function deleteNote( id ) {
        return ajaxUtil.ajax("DELETE", "/note/" + id + "/delete", );
    }

    services.restClient = {
        getNote,
        getNotes,
        createNote,
        editNote,
        setDone,
        deleteNote
    };
}( window.services = window.services || {}, jQuery ));