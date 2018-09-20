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