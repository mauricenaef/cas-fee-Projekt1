// Set Add Class is-done
Handlebars.registerHelper( 'isDone', function(status) {
    
    return (status === true ) ? ' is-done' : ''; 

});

// Set buttons disabled
Handlebars.registerHelper( 'setDisable', function(status) {

    return (status === true ) ? 'disabled="true"' : '';

});

// Handlebars Convert Date from Timestamp
Handlebars.registerHelper( 'convertDateTimestamp' ,function(date) {

	moment.locale('de');
	return moment.unix(date).format("LL");

});

// Handlebars Convert Date
Handlebars.registerHelper( 'convertDate' ,function(date) {

    moment.locale('de');
    return moment(date).format("DD. MMMM YYYY");

});

// Handlebars Helper set Auto Paragrap
Handlebars.registerHelper('autoP', function(description) {

    let i, output = '',

    lines = description.split(/\r\n|\r|\n/g);
    
    for (i = 0; i < lines.length; i++) {
        if(lines[i]) {
            output += '<p class="item-details">' + lines[i] + '</p>';
        }
    }
    return new Handlebars.SafeString(output);

});

// Handlebars Helper for Lightning Loog
Handlebars.registerHelper('lightning', function(n, times) {

    let icon = '';
    for(let i = 0; i < n; ++i)
        icon += times.fn(i);
    return icon;

});
