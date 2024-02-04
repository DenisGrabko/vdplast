"use strict";

function getData(url, obj) {
  let req = fetch(url, {
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
    if (
      window.getComputedStyle($DOM.mheadNavigation).getPropertyValue("right") !=
      "0px"
    ) {
      $DOM.mheadNavigation.style.cssText = "right: 0";
      $DOM.mheadToggle.dataset.checked = "true";
    } else {
      $DOM.mheadNavigation.style.cssText = "";
      $DOM.mheadToggle.dataset.checked = "false";
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
  const productsLink = document.querySelector('a[href="#products"]');
  const productionLink = document.querySelector('a[href="#production"]');
  const contactsLink = document.querySelector('a[href="#contacts"]');
  const contentContainer = document.querySelectorAll(".contentContainer");

  // Обработчик клика на кнопку открытия вкладки
  listContainerMobileToggle.addEventListener("click", () => {
    if (
      listContainerMobile.style.right === "0px" ||
      listContainerMobile.style.right === ""
    ) {
      listContainerMobile.style.right = "-750px";
    } else {
      listContainerMobile.style.right = "0px";
    }
  });

  // Обработчик клика на вкладку "Виробництво"
  productionLink.addEventListener("click", () => {
    listContainerMobile.style.right = "0px";
  });

  // Обработчик клика на вкладку "Контакти"
  contactsLink.addEventListener("click", () => {
    listContainerMobile.style.right = "0px";
  });

  // Обработчик клика на область вне вкладки
  document.addEventListener("click", (e) => {
    if (
      ![...contentContainer].every((container) => !container.contains(e.target))
    ) {
      listContainerMobile.style.right = "0px";
    }
  });
});
