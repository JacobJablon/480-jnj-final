const locations = [
  {
    title: "Xerox",
    captionPath: "../assets/Transcripts/Introduction_Xerox.vtt",
  },
  {
    title: "Bauch & Lomb",
    captionPath: "../assets/Transcripts/BauschLomb.vtt",
  },
  { title: "Kodak", captionPath: "../assets/Transcripts/Kodak.vtt" },
  { title: "ITX Corp", captionPath: "../assets/Transcripts/ITX_Corp.vtt" },
  { title: "The Quad", captionPath: "../assets/Transcripts/midpoint1.vtt.vtt" },
  { title: "Envative", captionPath: "../assets/Transcripts/Envative.vtt" },
  {
    title: "RoCo Quad",
    captionPath: "../assets/Transcripts/midpoint2.vtt",
  },
  { title: "Ending", captionPath: "../assets/Transcripts/Ending.vtt" },
];

const loadUI = (place, parent) => {
  const body = parent;
  const html = `
<div id="topUI" class="fixed-grid has-4-cols">
        <div class="grid is-column-gap-4">
            <div id="titleBox" class="box cell is-col-span-2" class="cell">${locations[place].title}</div> 
            <button id="mapBtn" class="cell button mt-2"><span class="icon is-large">
                    <i class="fa-solid fa-map-location-dot fas fa-lg"></i>
                </span></button>
        </div>
 </div>

    <button id="startBtn" class="button is-large">Click to start</button>
    <div id="bottomUI" class="card">
        <header class="card-header ">
            <p class="card-header-title">Scene 1/1</p>
        </header>
        <div class="card-content fixed-grid has-5-cols">
            <div class="content grid is-column-gap-2">
                <div id="captionBox" class="cell is-col-span-4"> Captions</div>
                <button id="restartBtn" class="cell button is-white  icon is-medium"><i
                        class="fa-solid fa-arrow-rotate-right"></i>
                </button>
            </div>
        </div>
    </div>
    `;

  body.insertAdjacentHTML("beforeend", html);

  //updateUI();
};

const updateUI = (place) => {};

const parseTime = (timeString) => {
  const [m, s] = timeString.split(":");
  return parseFloat(m) * 60 + parseFloat(s);
};

const loadCaptions = (place) => {
  const path = locations[place].captionPath;
  let captions = [];
  return fetch(path)
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
      }

      return captions;
    });
};

///module.exports = { loadUI, loadCaptions };
