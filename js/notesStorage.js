// Set Date today in Input and hidden fields
let now = new Date();
let day = ("0" + now.getDate()).slice(-2);
let month = ("0" + (now.getMonth() + 1)).slice(-2);
let today = now.getFullYear()+"-"+(month)+"-"+(day) ;

$('#due-date').val(today); 
$('#created-date').val(moment().unix()); 

(function($) { 
	$(function() {

		// If has query String Load note with ID
		//let urlParams = new URLSearchParams(window.location.search);
		//let formID = urlParams.get('formID');
		//if (formID ) {	
//
		//	let result = $.grep(noteData.notes, function(e){ return e.ID == formID;  });
//
		//	if ( result.length ) {
//
		//		let id 			= formID,
		//			done 		= result[0].done,
		//			title 		= result[0].title,
		//			description = result[0].description,
		//			dueDate 	= result[0].dueDate,
		//			priority 	= result[0].priority,
		//			createdDate = result[0].createdDate;
//
//
		//		console.log(result[0].title);
		//	}
//
		//}
//

		//$('body').addClass('loading');

		// New note from Form
		$("#new-note").on("submit", function(event){
			
			event.preventDefault();

			$('body').addClass('loading');

			// Get from Local Storage
			let item = JSON.parse(localStorage.getItem("notes")) || { notes: [] };
			let note = {
				'ID': item.notes.length + 1, 
				'done': false, 
				'title': $("#title").val(), 
				'description': $("#description").val(), 
				'dueDate': $("#due-date").val(), 
				'priority': $("input[name='priority']:checked").val(), 
				'createdDate': $("#created-date").val()
			};

			// Add Item to Object
			item.notes.push(note);

			// Save to localStorage
			localStorage.setItem("notes", JSON.stringify(item));

			// Forward to Home
			window.location.replace("index.html");

			// Cancel Event
			return false;

		});

 	});
})(jQuery);