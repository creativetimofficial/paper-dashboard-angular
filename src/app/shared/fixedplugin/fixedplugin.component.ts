import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'fixedplugin-cmp',
    templateUrl: 'fixedplugin.component.html'
})

export class FixedPluginComponent implements OnInit{
    ngOnInit(){
        var $sidebar = $('.sidebar');
        var $off_canvas_sidebar = $('.off-canvas-sidebar');
        var window_width = $(window).width();

        if(window_width > 767){
            if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
                $('.fixed-plugin .dropdown').addClass('open');
            }

        }

        $('.fixed-plugin a').click(function(event){
          // if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
            if($(this).hasClass('switch-trigger')){
                if(event.stopPropagation){
                    event.stopPropagation();
                }
                else if(window.event){
                   window.event.cancelBubble = true;
                }
            }
        });

        $('.fixed-plugin .background-color span').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if($sidebar.length != 0){
                $sidebar.attr('data-background-color',new_color);
            }

            if($off_canvas_sidebar.length != 0){
                $off_canvas_sidebar.attr('data-background-color',new_color);
            }
        });

        $('.fixed-plugin .active-color span').click(function(){
            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            var new_color = $(this).data('color');

            if($sidebar.length != 0){
                $sidebar.attr('data-active-color',new_color);
            }

            if($off_canvas_sidebar.length != 0){
                $off_canvas_sidebar.attr('data-active-color',new_color);
            }
        });
        $('#twitter').sharrre({
          share: {
            twitter: true
          },
          enableHover: false,
          enableTracking: true,
          buttons: { twitter: {via: 'CreativeTim'}},
          click: function(api, options){
            api.simulateClick();
            api.openPopup('twitter');
          },
          template: '<i class="fa fa-twitter"></i>',
          url: 'http://pd-angular.creative-tim.com'
        });

        $('#facebook').sharrre({
          share: {
            facebook: true
          },
          enableHover: false,
          enableTracking: true,
          click: function(api, options){
            api.simulateClick();
            api.openPopup('facebook');
          },
          template: '<i class="fa fa-facebook-square"></i>',
          url: 'http://pd-angular.creative-tim.com'
        });
    }
}
