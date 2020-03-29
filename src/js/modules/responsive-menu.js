console.log("responsive menu");
const menuWrapper = document.querySelector(".js__menu-wrapper");
const menuToggle = document.querySelector(".js__menu-toggle");

menuToggle.addEventListener("click", toggleMenu, true);

function toggleMenu(e) {
    e.preventDefault();
    menuToggle.classList.toggle("open");
    menuWrapper.classList.toggle("open");
}
