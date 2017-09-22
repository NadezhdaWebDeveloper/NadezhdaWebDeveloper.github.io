$(document).ready(function() {

  if($(window).height() < 768) {
    var teamheight = $(window).height() - $('.content__header').height() - 100;
  } else {
    var teamheight = $(window).height() - $('.content__header').height() - 200;
  }

  $('#menu .dotted_line').css('height', ($(window).height() - 240) + 'px');

  $('.team').css('height', teamheight + 'px');

  // Проверка, на какая страница активна
  if(window.location.href.indexOf('index') !== -1) {

    // Screen Contacts - background switcher
    $('body').on('click', '.switch_map_js', function() {
      $(this).addClass('active').closest('.switch').find('.switch_bg_js').removeClass('active')
      .closest('.mg-screen').removeClass('bg').addClass('map');
    });

    $('body').on('click', '.switch_bg_js', function() {
      $(this).addClass('active').closest('.switch').find('.switch_map_js').removeClass('active')
      .closest('.mg-screen').removeClass('map').addClass('bg');
    });
    // End Screen Contacts - background switcher


    // Team grid building
    var grid_options = {
      srcNode: '.team__item',     // grid items (class, node)
      margin: '10px',             // margin in pixel, default: 0px
      width: '300px',             // grid item width in pixel, default: 220px
      max_width: '300px',         // dynamic gird item width if specified, (pixel)
      resizable: true,            // re-layout if window resize
      transition: 'all 0.5s ease' // support transition for CSS3, default: all 0.5s ease
    }
    $('.team').gridify(grid_options);
    // End Team grid building

    // niceScroll init
    $('.team').niceScroll({cursorcolor:"transparent",cursoropacitymax:0,boxzoom:true,touchbehavior:true});
    $('.works-carousel').niceScroll({cursorcolor:"transparent",cursoropacitymax:0,boxzoom:true,touchbehavior:true});
    // End niceScroll init

    // Projects Vertical Carousel
    var scrollPos = 0,
        markerTop = ($(window).height() / 2) - $('.work').height(),
        markerBottom = $(window).height() / 2,
        works_nav_items = $('.works-nav__item'),
        carousel_indent = $(window).height() / 10;

    setTimeout(function () {
      $('.works-carousel').css('top', carousel_indent + 'px');
    }, 100);

    $('.works-carousel').scroll(function() {

      var st = $(this).scrollTop(),
          activeIndex = 0;

      $('.work').each(function(index, el) {
        if ($(el).hasClass('active')) {
          activeIndex = index;
        }
      });

       if (st > scrollPos) {
         if (activeIndex === 0) {
           $('.works-carousel').css({
             'top': 0,
             'bottom': 0
           });
         }
         if (activeIndex === works_nav_items.length - 2) {
           $('.works-carousel').css({
             'top': -carousel_indent + 'px',
             'bottom': carousel_indent + 'px'
           });
         }
         //  console.log('down');
         works_nav_items.eq(activeIndex - 1).removeClass('active');
         works_nav_items.eq(activeIndex).addClass('active');
         if ($('.work.active').offset().top < markerTop) {
           $('.work.active').removeClass('active').next().addClass('active');
         }
       } else {
         //  console.log('up');
         if (activeIndex === 1) {
           $('.works-carousel').css({
             'top': carousel_indent + 'px',
             'bottom': 0
           });
         }

         if (activeIndex === works_nav_items.length - 2) {
           $('.works-carousel').css({
             'top': 0,
             'bottom': 0
           });
         }

         works_nav_items.eq(activeIndex + 1).removeClass('active');
         works_nav_items.eq(activeIndex).addClass('active');
         if ($('.work.active').offset().top > markerBottom) {
           $('.work.active').removeClass('active').prev().addClass('active');
         }
       }
       scrollPos = st;

    });
    // End Projects Vertical Carousel

    // Screens navigation
    var floatAnchors = $('.float-anchor'),
    reversedFloatAnchors = [].reverse.call(floatAnchors),
    floatAnchorsQnt = floatAnchors.length,

    step = 45,
    bottomIndent = 15,
    spacing = 3,
    bottomBound = bottomIndent + ((floatAnchorsQnt - 1) * spacing); // 30

    // Расположение элементов бокового меню
    [].map.call(reversedFloatAnchors, function(anchor) {
      $(anchor).css('bottom', bottomIndent + '%');
      bottomIndent += spacing;
    });
    // End Расположение элементов бокового меню

    $("#fullpage").fullpage({
      anchors:['intro', 'about', 'our_progress', 'portfolio', 'projects', 'team', 'contacts'],
      menu:'#menu',
      scrollBar:false,
      //scrollOverflow:true
      navigation: false,
      // slidesNavigation:true,
      navigationPosition:'left',
      touchSensitivity: 15,
      //slidesNavPosition:'top'
      // loopTop:true,
      // loopBottom:true,
      loopHorizontal: true,
      fadingEffect: true,

      afterResize: function(link,index) {
        // alert('Hello');
      },
      onLeave: function(index, nextIndex, direction){
        var menuAnchors = $('.float-anchor'),
        menuAnchorsBottom = [],
        activeAnchorIndex = 0,
        anchorBottomValue = 0,
        nextNavItems = $('.next-nav__item');

        setTimeout(function() {

          menuAnchors.each(function(anchor_index, anchor) {
            if ($(anchor).hasClass('active')) {
              activeAnchorIndex = anchor_index;
            }
          });

          if ($('.float-anchor.active').hasClass('up')) {

            for (var j = activeAnchorIndex + 1; j < menuAnchors.length; j++) {
              anchorBottomValue = parseStylePropBottom($(menuAnchors[j])) - step;
              if ( (anchorBottomValue) > 0 ) {
                $(menuAnchors[j]).removeClass('up').css('bottom', anchorBottomValue + '%');
              }
            }
          } else {

            for (var i = 0; i <= activeAnchorIndex; i++) {
              anchorBottomValue = parseStylePropBottom($(menuAnchors[i])) + step;
              if ( (anchorBottomValue) <= (bottomBound + step) ) {
                $(menuAnchors[i]).addClass('up').css('bottom', anchorBottomValue + '%');
              }
            }
          }

        }, 100);

        if (nextIndex == menuAnchors.length) {
          $('body').addClass('inversion');
        } else {
          $('body').removeClass('inversion');
        }
      },

      afterLoad: function(link, index) {

        // console.log('afterLoad');
        // if(index == 3) {
        //   $("#section2 img").delay(2000).animate({'left':'0%'},2000);
        // }
        // if(link == '3rdPage') {
        //   $("#section2 h1").fadeIn(1500,function() {
        //     $("#section2 p").css({'display':'block'}).animate({'fontSize':'8em'},1000)
        //   });
        // }
      }
    });
    // End Screens navigation


  }
  // End Проверка, на какая страница активна

  $('body').on('click', '#temporary_marker', function(event) {
    event.preventDefault();

    var $that = $(this);
    var $parent = $that.closest('.contactForm').find('.contactForm__body');
    userInfoValidator($parent.find('input[name="name"]'));

    if ($parent.find('textarea[name="message"]').val() == '') {
      var msg = 'Обязательно для заполнения',
          target = $parent.find('textarea[name="message"]').closest('.contactForm__item');

      assignClass('invalid', target, msg);
    }

    if ($parent.find('.invalid').length === 0) {

      $that.closest('.contactForm').addClass('withPreloader');
      $that.closest('.contactForm').find('.preloader').removeClass('hidden');

      var data = {
        "theme": $parent.find('input[name="theme"]').val(),
        "name": $parent.find('input[name="name"]').val(),
        "email": $parent.find('input[name="email"]').val(),
        "phone": $parent.find('input[name="phone"]').val(),
        "message": $parent.find('textarea[name="message"]').val()
      };

      console.log(data);

      setTimeout(function () {

        $parent.find('input[name="theme"]').val('Other');
        $parent.find('label[for="theme"]').text('Тема письма');
        $parent.find('input[name="name"]').val('');
        $parent.find('input[name="email"]').val('');
        $parent.find('input[name="phone"]').val('');
        $parent.find('textarea[name="message"]').val('');

        $that.closest('.contactForm').removeClass('withPreloader');
        $that.closest('.contactForm').find('.preloader').addClass('hidden');
        $that.addClass('hidden');
        $('.contactForm__body').addClass('hidden');
        $('.success_send_js').removeClass('hidden');
      }, 2000);
    }

  });

  $('body').on('click', '.back-to-form_js', function() {
      $('.success_send').addClass('hidden');
      $('.contactForm__body').removeClass('hidden');
      $('#temporary_marker').removeClass('hidden');
  });



  // form
  $('body').on('focusout', '.input_validator_js', function(){
    userInfoValidator($(this));

    var targetLabel = $(this).parent().find('label');

    if ( $(this).val().length !== 0 ) {
      targetLabel.addClass('top');
    } else {
      targetLabel.removeClass('top');
    }
  });
  // End form


  // Psevdo Select
  $('body').on('click', '.psevdo_select_js', function() {
    $(this).closest('.psevdoSelectWrap').find('.psevdoSelect').toggleClass('active');
    if ($(this).closest('.psevdoSelectWrap').find('.psevdoSelect').hasClass('active')) {
      $(this).addClass('focus');
    } else {
      $(this).removeClass('focus');
    }
  });

  $('body').on('focus', '.contactForm .form-control:not([type="hidden"])', function() {
    $('.psevdoSelectWrap .psevdoSelect').removeClass('active').prev('.psevdo_select_js').removeClass('focus');
  });

  $('body').on('click', '.psevdoSelect.active .psevdoSelect__item', function() {
    $(this).closest('.psevdoSelectWrap').find('.psevdo_select_js').removeClass('focus');
    $(this).closest('.psevdoSelectWrap').find('.psevdoSelect').removeClass('active');
    $(this).closest('.psevdoSelectWrap').find('input[type="hidden"]').val($(this).data('value')).next().text($(this).data('value')).css('color', '#fff');
  });
  // End Psevdo Select

  // popUp Events
  $('body').on('click', '#contact_me_js', openPopUp);
  $('body').on('click', '#subscribe_js', openPopUp);
  $('body').on('click', '.overlay', closePopUp);
  // End popUp Events

  $('[name="phone"]').mask('+38 (999) 999-99-99');
});

function parseStylePropBottom(element) {
  var cssProp = 'bottom:',
      startPos = cssProp.length;

  return parseInt($(element).attr('style').slice(startPos), 10);
}

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
      msg = '',
      type = el.data('input-validate');

  var name_reg = /^[\'А-Яа-я-ЇїІіЁё ]+$|^[\'A-Za-z- ]+$/gi,
      email_reg = /(^([\w\.]+)@([\w]+)\.([\w]+)$)|(^$)/gi,
      // phone_reg = /\(\d{3}\) \d{3}-\d{2}-\d{2}/,
      number_reg = /^[0-9\s\(\)-]{1,}$/, //15
      field_empty = str.replace(/\s+/g, '').length;

  switch(type){
    case 'name':
      if (!field_empty) {

        msg = 'Обязательно для заполнения';
        assignClass('invalid', parent, msg);

      } else {
        msg = 'Введите корректное имя';
        name_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent, msg);
      }
      break;
    case 'email':
      if (field_empty) {
        $(parent).find('label span').css('display', 'none');
        msg = 'Введите корректный e-mail';
        email_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent, msg);
      } else {
        $(parent).find('label span').css('display', 'inline');
        assignClass('valid', parent);
      }
      break;
    case 'phone':
      // if (field_empty) {
      //
      //   if (number_reg.test(str)) {
      //     msg = 'Формат номера телефона +38 (xxx) xxx-xx-xx';
      //     phone_reg.test(str) ? assignClass('valid', parent) : assignClass('invalid', parent, msg);
      //   } else {
      //     msg = 'Допустимы только цифры';
      //     assignClass('invalid', parent, msg)
      //   }
      // } else {
      //   assignClass('valid', parent);
      // }
      break;
    case 'msg':
      if (!field_empty) {

        msg = 'Обязательно для заполнения';
        assignClass('invalid', parent, msg);

      } else {
        assignClass('valid', parent);
      }
      break;
  }

}

function assignClass(className, target, msg) {
  if (className == 'valid') {
    $(target).addClass('valid').removeClass('invalid');
  } else {
    $(target).addClass('invalid').removeClass('valid').find('.error').text(msg);
  }
}
