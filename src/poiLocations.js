const locations = [{ Title: "Xerox", captionPath: "" }];

export const loadUI = (place) => {
  const body = document.querySelector("body");
  const html = `<div>
    <div id="topUI" class="fixed-grid has-4-cols">
      <div class="grid is-column-gap-4">
        <button id="mapBtn" class="cell button icon is-large mt-2"><i
            class="fa-solid fa-map-location-dot fas fa-lg"></i></button>
        <div id="titleBox" class="box cell is-col-span-3" class="cell">${
          locations[place.Title]
        }</div>
      </div>

    </div>
    <button id="startBtn" class="button is-large">Click to start</button>
    <div id="bottomUI" class="card">
      <header class="card-header ">
        <p class="card-header-title">Scene one of 5 </p>
      </header>
      <div class="card-content fixed-grid has-5-cols">
        <div class="content grid is-column-gap-2">
          <button id="backbtn" class="cell button is-white icon is-medium "><i
              class="fa-solid fa-arrow-left fas fa-lg"></i>
          </button>
          <div id="caption-box" class="cell is-col-span-3"> </div>
          </button><button id="forwardbtn" class="cell button is-white  icon is-medium"><i
              class="fa-solid fa-arrow-right fas fa-lg "></i></button>
        </div>
      </div>
    </div>

  </div>`;

  body.insertAdjacentHTML("beforeend", html);
  document.getElementById("mapBtn").addEventListener("click", () => {
    sound.stop(); // stop resets the playback and stops it
  });
  updateUI();
};

const updateUI = (place) => {
  d;
};

const parseTime = (timeString) => {
  const [m, s] = timeString.split(":");
  return parseFloat(m) * 60 + parseFloat(s);
};

export const loadCaptions = (place) => {
  const path = locations[place].captionPath;
  let captions = [];
  fetch(path)
    .catch((error) => console.log("Error loading VTT file:", error))
    .then((response) => response.text())
    .then((text) => {
      const lines = text.trim().split("\n");
      let cue = null;

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("-->")) {
          const times = lines[i].split(" --> ");
          cue = {
            start: parseTime(times[0]),
            end: parseTime(times[1]),
            text: lines[i + 1].toString(),
          };

          captions.push(cue);
          i++; // skip caption line
        }

        return captions;
      }
    });
};
