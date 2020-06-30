$(function() {

    $('.reviewSlider').slick({
        slidesToShow: 1,
        dots: true,
        arrows: true,
        prevArrow: '<div class="client__arrow_prev"><i class="fa fa-angle-left"></i></div>',
        nextArrow: '<div class="client__arrow_next"><i class="fa fa-angle-right"></i></div>',
        appendDots: '.review__circles',
        dotsClass: 'review__circle',
        draggable: false,
        responsive: [{
            breakpoint: 993,
            settings: {
                arrows: false,
                draggable: true,
            }
        }]
    });

    let $arrow = $('.arrow');
    $arrow.on('click', function(e) {
        e.preventDefault();

        let target = $('.arrow-point');

        $('html, body').animate({
         scrollTop: $(target).offset().top
        }, 700);
    });

    let clWidth = document.documentElement.clientWidth;

    $(window).on('resize', function() {
        clWidth = document.documentElement.clientWidth;

        if(clWidth > 993) {
           $('.header__listWrapper').show();
        }
    });

    $(window).on('click', function(e) {
        if (clWidth < 993) {
             if(!$(e.target.offsetParent).hasClass('header__list')) {
                $('.header__listWrapper').hide(300);
            }
        }
    });

    $('.header__bar').on('click', function() {
        $(this).next().toggle(300);
    });

    $('input[type=tel]').mask("+9 (999) 999-9999", {autoclear: false});

    let $submit = $('.form__btn');
    let $form   = $('.form__block');
    let $result = $('.form__result');
    let $errors = $('label[data-error]');

    $($submit).on('click', function() {
        $submit.html('<img src="./img/load.svg" class="form__load">');
        $submit.attr('disabled', true);

        $.ajax({
            url: 'send.php',
            method: 'POST',
            data: $form.serialize(),
            dataType: 'json',
            timeout: 10000,
            success: onSuccess,
            error: function() {
                $result.html('Превышено ожидание ответа от сервера...');
            },
            complete: function() {
                $submit.attr('disabled', false);
                $submit.text('Заказать консультацию');
            },
        });

        function onSuccess(data) {
            if(data.res) {
                $form.slideUp(300);
                $result.html('Заявка отправлена!');
            } else {
                $errors.attr('data-error', '');
                $('.form__input').removeClass('form__input--wrong');

                for( let name in data.errors) {
                    let target = $(`[name=${name}]`);
                    
                    if(target.length > 0){
                        target.closest($errors).attr('data-error', data.errors[name]);
                        target.addClass('form__input--wrong');
                    }
                }
            }
        }
    });

});