$(document).ready(function () {
  const hamburger = document.querySelector(".hamburger");
  menu = document.querySelector(".menu");
  closeElem = document.querySelector(".menu__close");
  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
  });
  closeElem.addEventListener("click", () => {
    menu.classList.remove("active");
  });
  // changing the color of favicons
  $(window).scroll(function () {
    if ($(this).scrollTop() > $(".promo").height() - 490) {
      $(".sidepanel").addClass("sidepanel_active");
    } else {
      $(".sidepanel").removeClass("sidepanel_active");
    }
  });

  const procent = document.querySelectorAll(".reting-procent");
  line = document.querySelectorAll(".reting-line span");

  procent.forEach((item, i) => {
    line[i].style.width = item.innerHTML;
  });

  $("form.contacts__form").submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "mailer/send-email.php",
      data: $(this).serialize(),
    })
      .done(function () {
        $(this).find("input, textarea").val("");
        $("form.contacts__form").trigger("reset");
        document.querySelector(".message-send").innerHTML =
          "Сообщение отправлено";
      })
      .fail(function () {
        document.querySelector(".message-send").innerHTML =
          "Возникла ошибка при отправке";
      });
  });
});
