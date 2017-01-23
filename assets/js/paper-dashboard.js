var fixedTop = false;
var transparent = true;

var navbar_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();
    $('#menuresize a').click(function(){
        var href = $(this).attr('href');
        $('html,body').animate({
            'scrollTop': $($(this).attr('href')).offset().top - 100
        }, 200);
    })
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

});

pd = {
    checkScrollForTransparentNavbar: debounce(function() {
            if($(document).scrollTop() > 381 ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar-color-on-scroll').removeClass('navbar-transparent');
                    $('.navbar-title').removeClass('hidden');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar-color-on-scroll').addClass('navbar-transparent');
                    $('.navbar-title').addClass('hidden');
                }
            }
    }, 17),
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};
