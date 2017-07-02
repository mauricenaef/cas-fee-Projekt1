;(function($) {

    let form = $("#new-note");
    let noteData = window.services.restClient;

    // Set Date today in Input and hidden fields
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear() + "-" + ( month )+"-"+( day );
        
    

    $(function(){

        let formContainer = $("#new-note");
        let formTemplateData = Handlebars.compile( $("#editTemplate").html() );
        let item;	
        let noteId = getQueryParam("id");

        function checkValidId( id ) {

            return noteData.getNote( id );
        
        }


        function renderForm( item ) {

        	formContainer.html(formTemplateData( item ));
        	$("#due-date").val( today ); 
        	$("#created-date").val(moment().unix());
            $("#submitButton").html("Notiz Aktualisieren");
            $("#form-title").html("Notiz bearbeiten");

            //console.log(item.dueDate);
            // New note from Form
            form.on("submit", function( event ){

                let title = $("#title").val();
                let description =  $("#description").val();
                let dueDate = moment($("#due-date").val()).unix();
                let priority = parseInt($("input[name='priority']:checked").val());
                let createdDate = $('#created-date').val(moment().unix());
                
                event.preventDefault();

                $('body').addClass('loading');

                if ( noteId ) {

                    noteData.editNote( item._id, title, false, description, priority, item.createdDate, dueDate ).done( function( message ) {
                        
                        // Forward to Home
                        window.location.replace("index.html");

                    }).fail( function ( message ) {
                        
                        alert( message );

                    });


                } else {

                    noteData.createNote( title, description, dueDate, priority, createdDate ).done( function ( message ) {
                        
                        // Forward to Home
                        window.location.replace("index.html");
                         
                        }).fail( function ( message ) {
                        
                        alert( message );
                    
                    });

                }

                

            });
  
        }

        function getQueryParam( name, url ) {

            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec( url );
            if (!results) return null;
            if (!results[2]) return '';

            return decodeURIComponent(results[2].replace(/\+/g, " "));

        }

        // Load single note on edit form
        if ( noteId ) {

            noteData.getNote(noteId).done(function ( item ){

                renderForm( item );
            
            });
        
        } else {

            renderForm();

        }

        
    });

}(jQuery));