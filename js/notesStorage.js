"use strict";

// Set Date today in Input and hidden fields
let now = new Date();
let day = ("0" + now.getDate()).slice(-2);
let month = ("0" + (now.getMonth() + 1)).slice(-2);
let today = now.getFullYear()+"-"+(month)+"-"+(day) ;
//let isInEditMode = 
$('#due-date').val(today); 
$('#created-date').val(moment().unix()); 

(function($) { 

	// Get from Local Storage
	let item = JSON.parse(localStorage.getItem("notes")) || { notes: [] };
	let addNote = function() {
		let note = {
			'ID': item.notes.length + 1, 
			'done': false, 
			'title': $("#title").val(), 
			'description': $("#description").val(), 
			'dueDate': $("#due-date").val(),
			'doneDate': '', 
			'priority': $("input[name='priority']:checked").val(), 
			'createdDate': $("#created-date").val()
		};

		// Add Item to Object
		item.notes.push(note);
		return item;
	};

	$(function() {

		// New note from Form
		$("#new-note").on("submit", function(event){
			
			event.preventDefault();

			$('body').addClass('loading');

			// Save to localStorage
			localStorage.setItem("notes", JSON.stringify(addNote()));

			// Forward to Home
			window.location.replace("index.html");

		});

 	});
})(jQuery);



let Notes = (function () {

	// Set Data as Variable
	let notesData = JSON.parse(localStorage.notes);

	let addNotes = function ( note ) {
	  
		
	  
	};

	let getNotes = function ( order, filter ) {

		// add filter from localstorage
		if ( order === 'priority' ) {
		
			notesData.notes.sort(function(a, b){return b[order] - a[order]});
		
		} else {

			notesData.notes.sort(function(a, b){
			
			    let x = a[order].toLowerCase();
			    let y = b[order].toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});

		}
	  
	};

	let editNotes = function ( note ) {
	  
	};
	
	return {
		addNotes: addNotes,
		getNotes: getNotes,
		editNotes: editNotes
	};

})();