"use strict";

(function($) { 

	// Set Data as Variable
	let noteData = JSON.parse(localStorage.notes);

	// Compile Handlebars Template
	let notesTemplate = $('#notesTemplate').html();
	let notesTemplateData = Handlebars.compile (notesTemplate);

	let renderNotes = function () {
		
		let output = notesTemplateData(noteData);
		let filter = localStorage.getItem("filter");
		let data =  $.grep(noteData.notes, function(e){ return e.done === false; });
		let newNoteData = {notes: data};

		if (filter) {
			output = notesTemplateData(newNoteData);
		}
		
		$('#note').html(output);	

	}

	let updateNotes = function ( noteData ) {

		localStorage.setItem("notes", JSON.stringify( noteData) );

	}

	let sortBy = function ( sortValue ) {
		
		if ( sortValue === 'priority' ) {
		
			noteData.notes.sort(function(a, b){return b[sortValue] - a[sortValue]});
		
		} else {

			noteData.notes.sort(function(a, b){
			
			    let x = a[sortValue].toLowerCase();
			    let y = b[sortValue].toLowerCase();
			    if (x < y) {return -1;}
			    if (x > y) {return 1;}
			    return 0;
			});

		}

		renderNotes();

	}

	let setStatus = function (element, value) {

		let id = $(element).data('id');
		let status = $(element).data('done');
		
		for (let i = 0; i < noteData.notes.length; i++) {

			if( noteData.notes[i].ID === id ){  
			    
			    noteData.notes[i].done = value;  
			
			    break;  
			}
		}

		updateNotes( noteData );

	}

	// Edit or delete
	let editItem = function ( element, action ) {

		let id = $(element).data('id');
					
		if ( action === 'delete' ) {
			for (let i = 0; i < noteData.notes.length; i++) {

				if( noteData.notes[i].ID === id ){
					noteData.notes.splice( i, 1 );
				}

			}

			console.log('item ' + id + ' deleted' );

			updateNotes( noteData );

			renderNotes();

		} else if ( action === 'edit') {

			console.log('edit item');

			window.location.replace( "new-note.html?formID=" + id );

		}			

	}

	// Set Filter Checkbox 
	$(window).on('load', function () {

		var filter = localStorage.getItem("filter");
		
		if (filter !== null) {
		    $("input[name='show-done']").attr("checked", "checked");
		}

	});

	$(function() {

		// Build
		renderNotes();

		// Filter options set on checkbox change
		$( document ).on( 'change', '#show-done', function() {
			
			if ($(this).is(":checked")) {
			    localStorage.setItem("filter", $(this).val());
			} else {
			    localStorage.removeItem("filter");
			}
			
			// Rebuild Notes
			renderNotes();

		});

		// Listen for Change of Status
		$( document ).on( 'click', '.status', function(e) {

			let $this = $(this);
			let item = $this.closest('.list-item');
			let status = item.data("done");

			// Set Item Attr
			item.toggleClass('is-done')
			.attr('data-done', !status)
			.find('button')
			.prop('disabled', function(i, v) { return !v; });

			// set the opposite status
			setStatus(item, !status);

		});

		// Listen for Edit or Delete Action
		$( document ).on( 'click', '.update-item', function(e){

			let $this = $(this);
			let item = $this.closest('.list-item');
			let action = $this.data('action');

			editItem( item, action );

		});

		// Listen for Filter
		$( document ).on( 'click', '.filter-item', function(e) {
			
			let sortValue = $(this).data('value');
			
			$(this).addClass('current').siblings().removeClass('current');

			sortBy( sortValue );
		});

 	});
})(jQuery);