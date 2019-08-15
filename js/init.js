'use strict';
console.log( 'init.js was loaded' );

$(document).ready(function(){
    $('#close-noscript').remove();
    $('#close-noscript-label').remove();

    if( $(window).innerWidth() > 1024 ){
        $.get( './html/desktop.html', function( data ){
            $( data ).prependTo( '#body' );
            $( '<script>', { src: './js/main.js' } ).appendTo( '#body' );
            // $( '<script>', { src: './js/prism.js' } ).appendTo( '#body' );

            if( localStorage ){
                var page_number = $('.active-page').attr( 'id' ).substr(5);
                if( localStorage.page ){
                    $( '#button-' + page_number ).removeClass( 'active-button' );
                    $( '#page-' + page_number ).removeClass( 'active-page' );

                    page_number = localStorage.page;
                    $( '#button-' + localStorage.page ).addClass( 'active-button' );
                    $( '#page-' + localStorage.page ).addClass( 'active-page' );
                } else {
                    localStorage.page = page_number;
                }
            }
            $('#init-js').remove();
        });
        console.log( 'load #desktop', $(window).innerWidth() );
    } else {
        $.get( './html/phone.html', function( data ){
            $( data ).prependTo( '#body' );
            $( '<script>', { src: './js/main.js' } ).appendTo( '#body' );
            $('#init-js').remove();
        });
        console.log( 'load #phone', $(window).innerWidth() );
    }
});
