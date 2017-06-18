// Theme Changer
let root = document.querySelector(':root');
let currentTheme = localStorage.getItem("theme") || 'light';

// Set Saved theme on Load
$(window).on('load', function () {
	$('input:radio[id='+ currentTheme +']').prop('checked', true);
	root.className = currentTheme;
});

(function($) {

	// Style Changer
    $('input[type=radio][name=change-theme]').change(function() {

        currentTheme = this.value;
        // change values of custom properties and save to localStorage
        root.className = currentTheme;
        localStorage.setItem('theme', currentTheme);

    });


}(jQuery));