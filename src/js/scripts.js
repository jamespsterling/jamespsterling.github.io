document.querySelector("html").classList.remove("no-js");

if (document.querySelector("header").classList.contains("active")) {
  document.querySelector("header").classList.remove("active");
  document.querySelector("body").classList.remove("active");
}

document.querySelector("header a").onclick = function (e) {
  e.preventDefault();
  var scrollDistance = document
    .querySelector("header a")
    .getAttribute("href")
    .getBoundingClientRect().top;
  window.scroll({ top: scrollDistance, behavior: "smooth" });
};

document.querySelector("#to-top").onclick = function (e) {
  window.scroll({ top: 0, behavior: "smooth" });
};

document.querySelector("#lead-down span").onclick = function (e) {
  var scrollDistance = document
    .querySelector("#lead-down span")
    .getBoundingClientRect().top;

  window.scroll({ top: scrollDistance, behavior: "smooth" });
};

document.querySelector("#mobile-menu-open").onclick = function (e) {
  document.querySelector("body").classList.add("active");
  document.querySelector("header").classList.add("active");
};

document.querySelector("#mobile-menu-close").onclick = function (e) {
  document.querySelector("body").classList.remove("active");
  document.querySelector("header").classList.remove("active");
};

var myLazyLoad = new LazyLoad({
  elements_selector: ".lazy",
});
