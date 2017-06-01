$(document).ready(function(){

	// Open and close mobile menu ---
	$('body').on('click', '.mobileMenuBtn_js, .mobile_active .menuPanel_js, .closeMenu__btn_js', function(){
		$('.headerMenu_js').toggleClass('mobile_active');

		if ( $('.headerMenu_js').hasClass('mobile_active') ) {
			$('body').css('overflow', 'hidden');

			if (window.outerHeight < 768) {
				$('.headerMenu__nav').css({
					'overflow': 'scroll'
				});
			}
		}else{
			$('body').css('overflow', 'scroll');
		}
	});
	// --- Open and close mobile menu

	// Контекстное меню на странице "Настройки" ---
	$('body').on('click', '.inspector__mobileBtns_js', function(){
		$(this).closest('.inspector__pannel').find('.inspector__btns_js').toggleClass('active');
		$('#substrate').toggleClass('contextMenu');
	});

	$('body').on('click', '.counterItem__mobileControls_js', function(){
		$(this).closest('.counterItem').find('.counterItem__controls').toggleClass('active');
		$('#substrate').toggleClass('contextMenu');
	});

	$('body').on('click', '#substrate.contextMenu', function(){
		$('.inspector__btns_js.active, .counterItem__controls.active').toggleClass('active');
		$('#substrate').toggleClass('contextMenu');
	});
	// --- Контекстное меню на странице "Настройки"

	if (window.outerWidth < 767) {
		$('.inspectors').find('button.btnStyle_сolorgray').each(function() {
			$( this ).removeClass('btnStyle_сolorgray').addClass('btnStyle_сolor').text('Добавить');
		});
		$('#addCounter').text('Добавить');
	}

	// Toggle tabs ---
	$(".tabs").on("click", ".tabs__item:not(.active)", function() {
		var $tabsBlockJs = $(this).parents(".tabs_block_js");
		toggleTabs($tabsBlockJs, $(this));
	});
	// --- Toggle tabs


	// Show/Hide financeArchive block on the page 'Finance'.
	$('body').on('click', '.toShowArchive_js', function(){
		$(this).closest('.archiveMarker_js').toggleClass('showArchive');
	});




	// Валидация формы регистрации ---

	$('body').on('focusout', '.input_validator_js', function(){
		validationOfRegistration($(this));
	});

	function validationOfRegistration(el){
		var thisInput = el,
			str = el.val(),
			errorMsg,
			type = el.data('input-validate');

		var email_reg = /(^([\w\.]+)@([\w]+)\.([\w]+)$)|(^$)/gi;

		switch(type){
			case 'fname':
				str.length > 2 
					? validateSuccess(thisInput)
					: function(){
						if (str.length < 3) errorMsg = 'The name must be at least 3 characters';
						
						validateError(thisInput, errorMsg);
					}();
			break;
			case 'sname':
				str.length > 2
					? validateSuccess(thisInput)
					: function(){
						if (str.length < 3) errorMsg = 'The surname must be at least 3 characters';

						validateError(thisInput, errorMsg);
					}();
			break;
			case 'email':
				email_reg.test(str) ? validateSuccess(el) : validateError(el, 'The email must be a valid email address');
			break;
			case 'password':
				str.length > 5 ? validateSuccess(el) : validateError(el, 'The password must be at least 6 characters');
			break;
			case 'confirmpassword':
				str.length > 5 ? validateSuccess(el) : validateError(el, 'The password must be at least 6 characters');
			break;
		}
	}

	function validateSuccess(el){
		el.closest('.form-group').addClass('has-success').removeClass('has-danger').find('.errorMsg_js').text('');
	}

	function validateError(el, errorMsg){
		var errorMsg = errorMsg;
		if (el.val().length < 1) errorMsg = 'This is a required field';
		el.closest('.form-group').addClass('has-danger').removeClass('has-success').find('.errorMsg_js').text(errorMsg);
	}

	// --- Валидация формы регистрации


	function toggleTabs(tabsBlock, el) {
		el.addClass("active").siblings().removeClass("active");

		tabsBlock.find(".box_js").eq( el.index()).show(1, function() {
			el.addClass("open_tab");
		}).siblings(".box_js").hide(1, function() {
			el.removeClass("open_tab");
		})
	}


});