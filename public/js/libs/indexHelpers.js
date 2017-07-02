class Note {
    constructor( id, title, description, dueDate, priority,  createdDate, done, doneDate ) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._createdDate = createdDate;
        this._done = done; 
        this._doneDate = doneDate; 
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get createdDate() {
        return this._createdDate;
    }

    get done() {
        return this._done;
    }

    get doneDate() {
        return this._doneDate;
    }

}

// Create Array to filter and Sort
let noteDataToArray = function (items) {
    var notes = [];
    for ( let item of items ) {
        notes.push( new Note( item._id, item.title, item.description, item.dueDate, item.priority, item.createdDate, item.done, item.doneDate ));
    }
    return notes;
};

// Create sorting function
Array.prototype.sortBy = function (sortValue) {

	
	if ( sortValue === "priority" ) {
	
		return this.sort( function( a, b ){return b[sortValue] - a[sortValue]});
	
	} else {
	
		return this.sort( function( a, b ){return a[sortValue] - b[sortValue]});
		
	}

};

Array.prototype.filterBy = function () {

	return this.filter( function (item) {

	    return item.done == false;
	
	});

};