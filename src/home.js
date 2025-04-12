import * as utils from "./utils.js";

const setupNav = () => {
    const burgerIcon = document.querySelector("#burger");
    const navbarMenu = document.querySelector("#nav-links");
    const span1 = document.querySelector("#span1");
    const span2 = document.querySelector("#span2");
    const span3 = document.querySelector("#span3");
    let menuIsOpen = false;

    burgerIcon.addEventListener("click", () => {
        navbarMenu.classList.toggle("is-active");

        // the below if else block allows for the burger menu icon to tranform into an "X" on click
        if (menuIsOpen == false) {
            span1.style.transform = "rotate(-45deg) translateY(4px) translateX(-4px)";
            span2.style.transform = "rotate(45deg)";
            span3.style.display = "none";
            menuIsOpen = true;
        } else if (menuIsOpen == true) {
            span1.style.transform = "none";
            span2.style.transform = "none";
            span3.style.display = "block";
            menuIsOpen = false;
        }
    });
}

const init = () => {
    setupNav();
    const route = [utils.poiLocations[0], utils.poiLocations[1], utils.poiLocations[2], utils.poiLocations[3], utils.poiLocations[4], utils.poiLocations[5]];
    utils.setupMap(route, 14);
}

window.onload = init;