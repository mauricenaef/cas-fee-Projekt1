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

// overwrite Array function to create sorting function
if (!Array.prototype.sortBy) {
    Array.prototype.sortBy = function (sortValue) {
        // sort priority from to to bottom makes more sense
        if (sortValue === "priority") {
            return this.sort( function( a, b ){return b[sortValue] - a[sortValue]});
        } else {
            return this.sort( function( a, b ){return a[sortValue] - b[sortValue]});
        }
    };
}

// overwrite Array function to create filter function
if (!Array.prototype.filterBy) {
    Array.prototype.filterBy = function () {
        return this.filter( function (item) { return item.done == false; });
    };
}
