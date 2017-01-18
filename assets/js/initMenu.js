

var mobile_menu_initialized = false,
    toggle_initialized = false,
    bootstrap_nav_initialized = false,
    mobile_menu_visible = 0;
console.log(mobile_menu_visible);
$(document).ready(function(){
    window_width = $(window).width();

    pd.initSidebarCheck();
    console.log('document is ready');
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

});

// activate collapse right menu when the windows is resized
$(window).resize(function(){
    console.log('resized');
    pd.initSidebarCheck();
});

pd = {

    initSidebarCheck: function(){
        if($(window).width() <= 991){
            if(($(".sidebar").length) != 0){
                console.log('sidebar.length != 0 ');
                pd.initRightMenu();
            } else{
                pd.initBootstrapNavbarMenu();
            }
        }
    },
    initRightMenu: debounce(function(){
        $sidebar_wrapper = $('.sidebar-wrapper');

        if(!mobile_menu_initialized){
            console.log('mobile_menu_initialized e false');
            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            nav_content = '';
            mobile_menu_content = '';

            $navbar.children('ul').each(function(){

                content_buff = $(this).html();
                nav_content = nav_content + content_buff;
            });
            console.log('çreem mobile-menu si mobile_menu_initialized devine true');
            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            $sidebar_nav = $sidebar_wrapper.find('.nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            $nav_content.insertBefore($sidebar_nav);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            console.log('élse mobile_menu_initialized e true, scoatem mobile-menu si mobile_menu_initialized devine false');
            if($(window).width() > 991){
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }

        if(!toggle_initialized){
            console.log('toggle_initialized e false');
            $toggle = $('.navbar-toggle');
            $layer = $('.close-layer');
            $toggle.click(function (){
                console.log('facem click pe toggle');
                if(mobile_menu_visible === 1) {
                    console.log('mobile_menu_visible e 1 si scoatem nav-open');
                    $('html').removeClass('nav-open');
                    $layer.removeClass('visible');

                    setTimeout(function(){
                        $toggle.removeClass('toggled');
                    }, 400);

                    setTimeout(function(){
                        $('.close-layer').remove();
                    }, 100);
                    console.log('mobile_menu_visible devine 0');
                    mobile_menu_visible = 0;
                } else {
                    console.log('mobile_menu_visible e 0 si facem toggle');
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 430);

                    $layer = $('<div class="close-layer"/>');
                    $layer.appendTo(".wrapper");

                    setTimeout(function(){
                        $layer.addClass('visible');
                    }, 100);

                    $('.close-layer').on("click", function(){
                        $toggle = $('.navbar-toggle');
                        $('html').removeClass('nav-open');

                        $layer.removeClass('visible');
                        console.log('çlick pe layer si scoatem nav-open');
                        setTimeout(function(){
                            $('.close-layer').remove();
                            $toggle.removeClass('toggled');
                        }, 370);
                        console.log('facem mobile_menu_visible egal cu 0');
                        mobile_menu_visible = 0;
                    });
                    console.log('ádaugam nav-open si mobile_menu_visible il facem 1');
                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;

                }

            });


            console.log('toggle_initialized devine true');
            toggle_initialized = true;
        }
    }, 200),
    initBootstrapNavbarMenu: debounce(function(){
        if(!bootstrap_nav_initialized){
            $navbar = $('nav').find('.navbar-collapse').first().clone(true);

            nav_content = '';
            mobile_menu_content = '';
            //add the content from the regular header to the mobile menu
            $navbar.children('ul').each(function(){
                content_buff = $(this).html();
                nav_content = nav_content + content_buff;
            });

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';
            $navbar.html(nav_content);
            $navbar.addClass('bootstrap-navbar');

            // append it to the body, so it will come from the right side of the screen
            $('body').append($navbar);
            $toggle = $('.navbar-toggle');
            $navbar.find('a').removeClass('btn btn-round btn-default');
            $navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
            $navbar.find('button').addClass('btn-simple btn-block');

            $toggle.click(function (){
                if(mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');
                    $('.close-layer').remove();

                    setTimeout(function(){
                        $toggle.removeClass('toggled');
                    }, 400);
                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 430);

                    $layer = $('<div class="close-layer"></div>');
                    $layer.appendTo(".wrapper-full-page");

                    setTimeout(function(){
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        $('html').removeClass('nav-open');

                        mobile_menu_visible = 0;
                        $layer.removeClass('visible');

                        setTimeout(function(){
                            $layer.remove();
                            $toggle.removeClass('toggled');
                        }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;
                }
            });

            bootstrap_nav_initialized = true;
        }
    }, 500)
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
