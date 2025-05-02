import * as utils from "./utils.js";

const urlParams = new URLSearchParams(window.location.search);
let startingLocation = urlParams.get("startingLocation");

let poiPage = "";

const drawRoute = () => {
  let start;
  let end;
  let route;
  let zoom;
  let userCoords = {};
  const fromTo = document.querySelector("#fromTo");

  if (!startingLocation) {
    //FOR TESTING PURPOSES
    startingLocation = "notStarted";
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userCoords.lat = position.coords.latitude;
        userCoords.lon = position.coords.longitude;
        // console.log(position);
        console.log(
          "nearest" + utils.isLocationClose(userCoords, utils.poiLocations[0])
        );
        console.log("LAT: ", userCoords.lat);
        console.log("LON: ", userCoords.lon);
        poiPage = "";
        if (startingLocation == "notStarted") {
          route = [userCoords, utils.poiLocations[0]];
          start = "Your location";
          end = utils.poiLocations[0].name;
          zoom = 16;
          if (utils.isLocationClose(userCoords, utils.poiLocations[0])) {
            poiPage = "./poiLocations/Xerox.html";
          }
        } else if (startingLocation == "xerox") {
          route = [utils.poiLocations[0], utils.poiLocations[1]];
          start = utils.poiLocations[0].name;
          end = utils.poiLocations[1].name;
          zoom = 17;
          if (utils.isLocationClose(userCoords, utils.poiLocations[1])) {
            poiPage = "./poiLocations/BauschLomb.html";
          }
        } else if (startingLocation == "bausch") {
          route = [utils.poiLocations[1], utils.poiLocations[2]];
          start = utils.poiLocations[1].name;
          end = utils.poiLocations[2].name;
          zoom = 15;
          if (utils.isLocationClose(userCoords, utils.poiLocations[2])) {
            poiPage = "./poiLocations/Kodak.html";
          }
        } else if (startingLocation == "kodak") {
          route = [utils.poiLocations[2], utils.poiLocations[3]];
          start = utils.poiLocations[2].name;
          end = utils.poiLocations[3].name;
          zoom = 15;
          if (utils.isLocationClose(userCoords, utils.poiLocations[3])) {
            poiPage = "./poiLocations/ITX_Corp.html";
          }
        } else if (startingLocation == "itx") {
          route = [utils.poiLocations[3], utils.poiLocations[4]];
          start = utils.poiLocations[3].name;
          end = utils.poiLocations[4].name;
          zoom = 15;
          if (utils.isLocationClose(userCoords, utils.poiLocations[6])) {
            poiPage = "./poiLocations/MillerQuad.html";
          }
        } else if (startingLocation == "millerQuad") {
          route = [utils.poiLocations[4], utils.poiLocations[5]];
          start = utils.poiLocations[4].name;
          end = utils.poiLocations[5].name;
          zoom = 15;
          if (utils.isLocationClose(userCoords, utils.poiLocations[6])) {
            poiPage = "./poiLocations/Envative.html";
          }
        } else if (startingLocation == "Envative") {
          route = [utils.poiLocations[5], utils.poiLocations[6]];
          start = utils.poiLocations[5].name;
          end = utils.poiLocations[6].name;
          zoom = 16;
          if (utils.isLocationClose(userCoords, utils.poiLocations[6])) {
            poiPage = "./poiLocations/Midpoint2.html";
          }
        } else if (startingLocation == "artCenterQuad") {
          route = [utils.poiLocations[6], utils.poiLocations[7]];
          start = utils.poiLocations[6].name;
          end = utils.poiLocations[7].name;
          zoom = 16;
          if (utils.isLocationClose(userCoords, utils.poiLocations[7])) {
            poiPage = "./poiLocations/Ending.html";
          }
        }

        fromTo.textContent = `${start} -> ${end}`;

        utils.setupMap(route, zoom, userCoords);

        //redraw map every 10 sec to show movement of user
        setTimeout(drawRoute, 10000);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  console.log("USER COORDS: ", userCoords);
};

const init = () => {
  drawRoute();

  const arriveBtn = document.querySelector("#arrive-btn");
  arriveBtn.addEventListener("click", () => {
    window.location.href = poiPage;
  });
};

window.onload = init;
