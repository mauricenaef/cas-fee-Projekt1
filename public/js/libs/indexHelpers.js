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
