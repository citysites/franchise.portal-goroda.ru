
const animItems = document.querySelectorAll('.btn');

if(animItems.length > 0) {
    function animOnScroll() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 1;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (pageYOffset > (animItemOffset - animItemPoint) && pageYOffset < ( animItemOffset + animItemHeight)) {
                animItem.classList.add('btn-active');
            }
            else {
                animItem.classList.remove('btn-active');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }    
}

window.addEventListener('scroll', function() {
    animOnScroll();
  });



$(function(){
    $('.slider__inner').slick({
        nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
        prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
    });    
});

$(function() {
    $(".g-form").submit(function (event) {
      event.preventDefault();
   
      // Ссылка, которую получили на этапе публикации приложения
      let appLink = "https://script.google.com/macros/s/AKfycbx1qia-shiV01TFp5UHaArphB7MfVYJwf2eNyQLIiRIIyoleNashaPoDLBy6GJpDUIw-w/exec";
   
      // Сообщение при успешной отправке данных
      let successRespond = 'Сообщение успешно отправлено.';
   
      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить сообщение.';
   
      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];
   
      // h2 с ответом формы
      let formRespond = $(this).find('.g-form-respond');
   
      // h2 с заголовком формы
      let formTitle = $(this).find('.g-form__title');
   
      // Блок прелоадера
      let preloader = $(this).find('.g-form__preloader');
   
      // Кнопка отправки формы
      let submitButton = $(this).find('.g-form__button');
   
   
      // FormData
      let fd = new FormData(form);
   
   
      $.ajax({
   
        url: appLink,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function(){
   
          if(fd.get('honeypot').length) {
            return false;
          } else {
            fd.delete('honeypot');
          }
   
        // Показываем прелоадер
        preloader.css('opacity', '1');
   
        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
   
        // валидация других полей.
   
      },
   
    }).done(function(res, textStatus, jqXHR) {
   
      if(jqXHR.readyState === 4 && jqXHR.status === 200) {
   
      // Прячем заголовок формы
      formTitle.css({
        'display': 'none'
      });
   
      // Прячем прелоадер
      preloader.css('opacity', '0');
   
      // Выводим ответ формы.
      formRespond.html(successRespond).css('color', '#31304f');
       
      // Возвращаем активность кнопке отправки
      // submitButton.prop('disabled', false);
   
        // Очищаем поля формы
        form.reset();
   
      } else {
        formTitle.css({
          'display': 'none'
        });
        formRespond.html(errorRespond).css('color', '#31304f');
        preloader.css('opacity', '0');
        setTimeout( () => {
          formRespond.css({
            'display': 'none'
          });
          formTitle.css({
            'display': 'block'
          });
   
          submitButton.prop('disabled', false);
        }, 5000);
   
        console.log('Гугл не ответил статусом 200');
      }
    }).fail(function(res, textStatus, jqXHR) {
      formTitle.css({
        'display': 'none'
      });
      preloader.css('opacity', '0');
      formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
      setTimeout( () => {
        formRespond.css({
          'display': 'none'
        });
        formTitle.css({
          'display': 'block'
        });
        submitButton.prop('disabled', false); 
      }, 5000);
   
      console.log('Не удалось выполнить запрос по указанному в скрипте пути');
    }); 
  });
  }(jQuery));

