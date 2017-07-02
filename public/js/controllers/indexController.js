"use strict";

(function () {
	let noteData = window.services.restClient;
	
	// build handlebars on ready
	let notesContainer = $("#notes");
	let notesTemplateData = Handlebars.compile($("#notesTemplate").html());
	
	// Create Array to filter and Sort
	let noteDataToArray = function (items) {
	    var notes = [];
	    for ( let item of items ) {
	        notes.push( new Note( item._id, item.title, item.description, item.dueDate, item.priority, item.createdDate, item.done, item.doneDate ));
	    }
	    return notes;
	};

	// Edit or delete
	let editItem = function (element, action) {
		let id = $(element).data("id");
					
		if (action === "delete") {
			
			/** 
			* TODO: elete function still needs work
			*/

			// noteData.deleteNote( id );
			alert("Item with ID " + id + "could not be deleted. Delete not implemented.");

		} else if (action === "edit") {
			window.location.replace( "new-note.html?id=" + id );
		}			
	}

	// Set Status to done
	let setStatus = function ( element, value ) {
		let id = $(element).data("id");
		noteData.setDone(id, value);

		renderNotes();
	}
	
	// renderNotes
	let renderNotes = function () {
		// set default sort if nothing set
		let sort = localStorage.getItem("sort") ? localStorage.getItem("sort") : "createdDate" ;	
		// set filter default
		let filter = localStorage.getItem("filter") ? localStorage.getItem("filter") : false ;

		noteData.getNotes().done(function(items){
			items = noteDataToArray(items);
			items = items.sortBy(sort);
			
			if (filter) {
				items = items.filterBy();
			}
					
			notesContainer.html(notesTemplateData({notes : items}));	
		});

	};

	// Set Filter Checkbox 
	$( window ).on("load", function () {
		let filter = localStorage.getItem("filter");
		let sort = localStorage.getItem("sort");

		if (filter !== null) {
			$("input[name='show-done']").attr("checked", "checked");	
		}

		if (sort !== null) {
			$("#sort-" + sort ).attr("checked", "checked");		
		}
	});

	// Start document ready
	$(function(){
		
		// build notes on ready
		renderNotes();

		// Sort for Filter
		$(document).on('change', 'input[type=radio][name=sort]', function(e) {
			let sortValue = $(this).val();
			localStorage.setItem("sort", sortValue);

			renderNotes();
		});


		// Listen for Change of Status
		$(document).on( 'click', '.status', function(e) {
			let $this = $(this);
			let item = $this.closest('.list-item');
			let status = item.data("done");

			// Set Item Attr
			item.toggleClass("is-done")
			.attr("data-done", !status)
			.find("button")
			.prop("disabled", function(i, v) { return !v; });

			// set the opposite status
			setStatus(item, !status);
		});

		// Listen for Edit or Delete Action
		$(document).on( "click", ".update-item", function(e){
			let $this = $(this);
			let item = $this.closest(".list-item");
			let action = $this.data("action");

			editItem( item, action );
		});

		// Filter options set on checkbox change
		$(document).on( "change", "#show-done", function() {		
			if ($(this).is(":checked")) {		
				localStorage.setItem("filter", $(this).val());		
			} else {
				localStorage.removeItem("filter");		
			}
			
			// Rebuild Notes
			renderNotes();
		});

	});
}(jQuery));