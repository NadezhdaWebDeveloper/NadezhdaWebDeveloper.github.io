$(document).ready(function() {
  $('.carousel').carousel({
    interval: 5000
  });

  var searchBtn = document.getElementById('search_js'),
      contactBtn = document.getElementById('contact_js'),
      closeBtns = document.getElementsByClassName('close_js');

  searchBtn.addEventListener('click', openPopUp, false);
  contactBtn.addEventListener('click', openPopUp, false);

  [].map.call(closeBtns, function(btn) {
    btn.addEventListener('click', closePopUp, false);
  });

  $('body').on('focusout', '.input_validator_js', function(){
    userInfoValidator($(this));

    var targetLabel = $(this).parent().find('label');

    if ( $(this).val().length !== 0 ) {
      targetLabel.addClass('top');
    } else {
      targetLabel.removeClass('top');
    }
  });
});


// Show/Close popUp
function openPopUp(event) {
  event.preventDefault();

  var targetId = this.getAttribute('data-target'),
      target = document.getElementById(targetId);

  target.classList.add('active');
}

function closePopUp(event) {
  var popUpActive = document.getElementsByClassName('popUp active')[0];
  popUpActive.classList.remove('active');
}
// End Show/Close popUp


function userInfoValidator(el){
  var parent = $(el).closest('.form-group'),
      str = el.val(),
      type = el.data('input-validate');

  var name_reg = /^[\'А-Яа-я-ЇїІіЁё ]+$|^[\'A-Za-z- ]+$/gi,
      email_reg = /(^([\w\.]+)@([\w]+)\.([\w]+)$)|(^$)/gi,
      phone_reg = /\(\d{3}\) \d{3}-\d{2}-\d{2}/,
      msg_reg = str.replace(/\s+/g, '').length;

  switch(type){
    case 'name':
      name_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent);
    break;
    case 'email':
      email_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent);
    break;
    case 'phone':
      phone_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent);
    break;
    case 'msg':
      msg_reg ? assignClass('valid', parent) : assignClass('invalid', parent);
    break;
  }
}

function assignClass(className, target) {
  if (className == 'valid') {
    $(target).addClass('valid').removeClass('invalid');
  } else {
    $(target).addClass('invalid').removeClass('valid');
  }
}
