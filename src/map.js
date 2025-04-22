import * as utils from "./utils.js";

const drawRoute = () => {
    let startingLocation;
    let start;
    let end;
    let route;
    let zoom;
    let userCoords = {};
    const fromTo = document.querySelector("#fromTo");

    startingLocation = "xerox"; // ************** WILL NEED TO CHANGE THIS TO BE DYNAMIC

    if (startingLocation == "notStarted") {
        route = [[], utils.poiLocations[0]];
        start = "Your location";
        end = utils.poiLocations[0].name;
        zoom = 15;
    } else if (startingLocation == "xerox") {
        route = [utils.poiLocations[0], utils.poiLocations[1]];
        start = utils.poiLocations[0].name;
        end = utils.poiLocations[1].name;
        zoom = 17;
    } else if (startingLocation == "bausch") {
        route = [utils.poiLocations[1], utils.poiLocations[2]];
        start = utils.poiLocations[1].name;
        end = utils.poiLocations[2].name;
        zoom = 15;
    } else if (startingLocation == "kodak") {
        route = [utils.poiLocations[2], utils.poiLocations[3]];
        start = utils.poiLocations[2].name;
        end = utils.poiLocations[3].name;
        zoom = 15;
    } else if (startingLocation == "itx") {
        route = [utils.poiLocations[3], utils.poiLocations[4]];
        start = utils.poiLocations[3].name;
        end = utils.poiLocations[4].name;
        zoom = 15;
    } else if (startingLocation == "millerQuad") {
        route = [utils.poiLocations[4], utils.poiLocations[5]];
        start = utils.poiLocations[4].name;
        end = utils.poiLocations[5].name;
        zoom = 15;
    } else if (startingLocation == "envative") {
        route = [utils.poiLocations[5], utils.poiLocations[6]];
        start = utils.poiLocations[5].name;
        end = utils.poiLocations[6].name;
        zoom = 16;
    } else if (startingLocation == "artCenterQuad") {
        route = [utils.poiLocations[6], utils.poiLocations[7]];
        start = utils.poiLocations[6].name;
        end = utils.poiLocations[7].name;
        zoom = 16;
    }

    fromTo.textContent = `${start} -> ${end}`;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userCoords.lat = position.coords.latitude;
                userCoords.lon = position.coords.longitude;
                console.log(position);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.log("Geolocation is not supported by this browser.");
    }


    utils.setupMap(route, zoom, userCoords);

    //redraw map every 10 sec to show movement of user
    setTimeout(drawRoute, 10000);
}

const setupUI = () => {
    // const title = document.querySelector("#title");
    
}

const init = () => {
    drawRoute();
    setupUI();
}

window.onload = init;