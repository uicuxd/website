'use strict';
console.log( 'main.js was loaded' );

	// page navigation
	(function( buttons, pages ){
		var index = buttons.length;
		while( index-- ){
			// register on-click event for all buttons
			buttons[ index ].onclick = function( event ){
				// first remove all "active-button"
				var index = buttons.length;
				while( index-- ){
					buttons[ index ].classList.remove( "active-button" );
					pages[ index ].classList.remove( "active-page" );
				}
				// then add "active-button" to the target
				this.classList.add( "active-button" );
				// then add "active-page" to the target according to activated button
				document.getElementById( "page-" + this.id.substr( 7 ) ).classList.add( "active-page" );
			}
		}
	}( document.querySelectorAll( "span[id|=button]" ), document.querySelectorAll( "div[id|=page]" ) ) );

	// ES5 text to animate
//	(function cascadeLetters( elements ){
//		var elem_length = elements.length,
//			span_length = 0,
//			elem_index = 0,
//			span_index = 0,
//			array = [],
//			text = '';
//
//		while( elem_index < elem_length ){
//			array = elements[ elem_index ].textContent.split( '' );
//			span_length = array.length;
//			while( span_index < span_length ){
//				text += '<span>' + array[ span_index ] + '</span>';
//				++span_index;
//			}
//			elements[ elem_index ].innerHTML = text;
//			text = '';
//			span_index = 0;
//			++elem_index;
//		}
//	}( document.getElementsByClassName( 'cascade-letter' ) ) );

var slide_number = 1;
function fastArrowKey( where ){
	var active_page = '',
		active_button = '',
		page_number = 0,
		page = '',
		number_of_page = '',
		number_of_subpage = '',
		offset_top = 0,
		scroll_top = 0;

	try {
		active_page = document.getElementsByClassName( 'active-page' )[0].id;
		active_button = document.getElementsByClassName( 'active-button' )[0].id;
		page_number = parseInt( active_page.substr( 5 ) );
		page = document.getElementById( 'page-' + page_number );
		number_of_page = document.querySelectorAll( "div[id|=page]" ).length;
		number_of_subpage = document.querySelectorAll( "div[id|=subpage-" + page_number + "]" ).length;
	} catch ( error ) {
		console.log( 'fast arrow key function, variable assignment error:', error );
		return;
	}

	switch( where ){
	case 'top':
		if( slide_number === 1 ) slide_number = number_of_subpage;
		else slide_number--;
		try {
			offset_top = document.getElementById( 'subpage-' + page_number + '-slide-' + slide_number ).offsetTop;
		} catch( error ){
			console.log( 'fast arrow key function, offsetTop error', error );
			offset_top = 0;
		}
		document.getElementById( 'page-' + page_number ).scrollTo( 0, offset_top );
		// document.getElementById( 'subpage-' + page_number + '-slide-' + slide_number ).scrollIntoView();
		break;

	case 'bottom':
		if( slide_number === number_of_subpage ) slide_number = 0;
		slide_number++;
		try {
			offset_top = document.getElementById( 'subpage-' + page_number + '-slide-' + slide_number ).offsetTop;
		} catch( error ){
			console.log( 'fast arrow key function, offsetTop error', error );
			offset_top = 9999;
		}
		document.getElementById( 'page-' + page_number ).scrollTo( 0, offset_top );
		// document.getElementById( 'subpage-' + page_number + '-slide-' + slide_number ).scrollIntoView();
		break;

	case 'left':
		if( page_number === 1 ) page_number = number_of_page;
		else page_number--;
		// reset
		slide_number = 1;
		break;

	case 'right':
		if( page_number === number_of_page ) page_number = 0;
		page_number++;
		// reset
		slide_number = 1;
		break;

	case 'center':
		// it is done by CSS for toggling scroll-bar
		break;

	default:
		break;
	}

    try{
        document.getElementById( active_button ).classList.remove( "active-button" );
        document.getElementById( "button-" + page_number ).classList.add( "active-button" );
        document.getElementById( active_page ).classList.remove( "active-page" );
        document.getElementById( "page-" + page_number ).classList.add( "active-page" );
    } catch( error ){
        console.log( 'fast arrow key function, change active page error:', error );
    }
}

// old version of IE
(function isIE(){
	if( window.navigator.userAgent.indexOf( 'MSIE' ) !== -1 || window.navigator.userAgent.indexOf( 'Trident/' ) > 0 ){
		document.getElementById( 'ERROR' ).style.display = 'block';
		document.getElementById( 'warning' ).style.display = 'block';
		document.getElementById( 'old-IE' ).style.display = 'block';
		alert( 'Old Microsoft Internet Explorer detected!' );
		alert( 'Please Update Your Browser!' );
	}
}());

// handling form
var data = {},
	which = '',
	action = document.forms.emailUs.getAttribute( 'action' ),
	form_error = document.getElementById( 'form-error' );

function validateForm( value ){
	if( value === data[ which ] ){
		document.getElementById('send-form-button').setAttribute( 'disabled', 'true' );

		var valid_data = 'name=' + data.name + '&' +
			'email=' + data.email + '&' +
			'subject=' + data.subject + '&' +
			'message=' + data.message;

		var xhr = new XMLHttpRequest();
		xhr.open( 'POST', action, true );
		xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded');
		xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
		xhr.onreadystatechange = function(){
			if( xhr.readyState === 4 && xhr.status === 200 ){

				var result = xhr.responseText;
				switch( result ){
				case 'valid':
					document.getElementById( 'send-form-result' ).innerHTML = '&nbsp;';
					document.querySelector( 'td#send-form-result+ td' ).innerHTML = '&nbsp;';
					document.getElementById('send-form-button').removeAttribute( 'disabled');
					document.getElementById( 'form-error' ).style.animationIterationCount  = '0';
					form_error.textContent = 'Hello ' + data.name + '. Received.';
					break;

				case 'exist':
					document.getElementById( 'send-form-result' ).innerHTML = '&nbsp;';
					document.querySelector( 'td#send-form-result+ td' ).innerHTML = '&nbsp;';
					document.getElementById('send-form-button').removeAttribute( 'disabled');
					document.getElementById( 'form-error' ).style.animationIterationCount  = '0';
					form_error.textContent = data.name + ', we have your message!';
					break;

				default:
                    document.getElementById('send-form-button').removeAttribute( 'disabled');
					form_error.textContent = result;
					break;
				}
			}
		};
		xhr.send( encodeURI( valid_data ) );
	}
}

var email_us = document.getElementById( 'send-form' );
email_us.onclick = function(){
	data.name = document.forms.emailUs.userName.value;
	data.email = document.forms.emailUs.userEmail.value;
	data.subject = document.forms.emailUs.userSubject.value;
	data.message = document.forms.emailUs.userMessage.value;

	form_error.textContent = '';
	// parse form
	form_error.textContent = (function( data ){
        if( data[ 'name' ].toString().match( /^[ a-z]{3,31}$/i ) === null ){
			return 'Name, Only letters!';
		}
            
        if( data[ 'email' ].toString().match( /^[^"';]{5,49}$/ ) === null ){
			return 'Email is invalid!';
		}
        
        if( data[ 'subject' ].toString().match( /^[ a-z]{2,31}$/i ) === null ){
			return 'Subject, only letters!';
		}
        
        if( data[ 'message' ].toString().match( /^[ @?!a-z0-9._-]{2,255}$/i ) === null ){
			return 'Message, only numbers or letters!';
        }
		return 'valid';
	}( data ));

	if( form_error.textContent === 'valid' ){
		form_error.textContent = 'valid data';
		var array = [];
		for( var key in data ) array.push( key );
		which = array[ Math.floor( Math.random() * 3) ];
		document.getElementById( 'send-form-result' ).innerHTML = 're TYPE your ' + which + ':';
		document.querySelector( 'td#send-form-result+ td' ).innerHTML = '<input type="text" id="junk-mail-protection" onkeyup="validateForm(this.value);" placeholder="re TYPE your ' + which + '" autocomplete="off" required />';
	}
}
