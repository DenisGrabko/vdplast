"use strict";

function getData(url, obj) {
  fetch(url, {
    method: "POST",
    body: "",
  })
    .then((response) => response.text())
    .then((text) => {
      obj.innerHTML = text;
      main();
    });
}

function main() {
  /* DOM Elements */
  let $DOM = {
    root: document.getElementById("root"),
    masthead: document.getElementById("masthead"),
    mheadWrap: document.querySelectorAll(".mheadWrap"),
    mheadToggle: document.getElementById("mheadToggle"),
    mheadNavigation: document.getElementById("mheadRightContainer"),
    link: document.getElementsByTagName("a"),
    langSw: document.getElementById("langSwitch"),
  };

  /* RegExp Templates */
  let regExpT = {
    anchLink: /^#[A-z0-9]/,
  };

  /* Masthead Wrap */
  window.addEventListener("scroll", () => {
    window.scrollY >= 10
      ? ($DOM.masthead.style.cssText = "padding: 0")
      : ($DOM.masthead.style.cssText = "");
  });
  for (let elm of $DOM.mheadWrap) {
    elm.style.height = $DOM.masthead.offsetHeight + "px";
  }

  $DOM.mheadToggle.addEventListener("click", () => {
    if ($DOM.mheadNavigation.style.right === "0px") {
      $DOM.mheadNavigation.style.right = "-750px";
      $DOM.mheadToggle.dataset.checked = "false";
    } else {
      $DOM.mheadNavigation.style.right = "0px";
      $DOM.mheadToggle.dataset.checked = "true";
    }
  });

  for (let elm of $DOM.link) {
    elm.addEventListener("click", function (e) {
      let href = elm.getAttribute("href");
      if (regExpT.anchLink.test(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const listContainerMobile = document.getElementById("mheadRightContainer");
  const listContainerMobileToggle = document.getElementById("mheadToggle");

  // Получаем только нужные пункты меню
  const menuSections = document.querySelectorAll(
    '#mheadRightContainer a[href="#products"], ' +
      '#mheadRightContainer a[href="#production"], ' +
      '#mheadRightContainer a[href="#contacts"]'
  );

  // Исправленный обработчик клика на кнопку открытия меню
  listContainerMobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const currentRight = window.getComputedStyle(listContainerMobile).right;

    if (currentRight === "0px") {
      listContainerMobile.style.right = "-750px";
    } else {
      listContainerMobile.style.right = "0px";
    }
  });

  // Закрываем боковое меню при клике на один из разделов
  menuSections.forEach((section) => {
    section.addEventListener("click", () => {
      listContainerMobile.style.right = "-750px";
    });
  });

  // Обработчик клика вне меню
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest("#mheadRightContainer") &&
      !e.target.closest("#mheadToggle")
    ) {
      listContainerMobile.style.right = "-750px";
    }
  });
});
