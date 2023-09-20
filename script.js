//To get a particular slok from particular chapter
//const url = "https://bhagavad-gita3.p.rapidapi.com/v2/chapters/1/verses/1/";

let chNo = document.getElementById("chNo");
let verseNo = document.getElementById("verseNo");

let generateBtn = document.getElementById("generate-btn");
let verseContent = document.getElementById("verse-content");
let verseMeaning = document.getElementById("verse-meaning-content");
generateBtn.addEventListener("click", () => {
  generateVerse(chNo.value, verseNo.value);
});

let randomBtn = document.getElementById("random-btn");
randomBtn.addEventListener("click", () => {
  let c = Math.ceil(Math.random() * 18);
  let totalV = 0;
  if (c == 1) totalV = 47;
  else if (c == 2) totalV = 72;
  else if (c == 3) totalV = 43;
  else if (c == 4) totalV = 42;
  else if (c == 5) totalV = 29;
  else if (c == 6) totalV = 47;
  else if (c == 7) totalV = 30;
  else if (c == 8) totalV = 28;
  else if (c == 9) totalV = 34;
  else if (c == 10) totalV = 42;
  else if (c == 11) totalV = 55;
  else if (c == 12) totalV = 20;
  else if (c == 13) totalV = 34;
  else if (c == 14) totalV = 27;
  else if (c == 15) totalV = 20;
  else if (c == 16) totalV = 24;
  else if (c == 17) totalV = 28;
  else if (c == 18) totalV = 78;
  let v = Math.ceil(Math.random() * totalV);
  generateVerse(c, v);
});

// chNo is: "+`${chNo.value} ` + "verseNo is: " + `${verseNo.value}
let toggleHide = true;
let generateVerse = function (chNo, verseNo) {
  // if(!toggleHide){
  // verseContent.classList.toggle("hiddenDiv");
  // verseContent.classList.toggle("hiddenDiv");

  //   toggleHide = !toggleHide;
  // }
  verseContent.classList.toggle("hidden");
  verseMeaning.classList.toggle("hidden");
  const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chNo}/verses/${verseNo}/`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5fda10e651mshc22c0cbc807559fp1c1ccdjsne2073b4a77e6",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };
  async function getData() {
    try {
      const response = await fetch(url, options);
      const verse = await response.text();
      //the verse that we got is in string form we need to parse it to get JS object
      //we need to convert it into json
      // console.log(verse);
      // console.log("\n\n\n");

      // console.log(JSON.parse(verse));
      // console.log("\n\n\n");

      let objVerse = JSON.parse(verse);
      for (let key in objVerse) {
        console.log(key);
        if (objVerse.hasOwnProperty(key)) {
          if (key == "commentaries") {
            value = objVerse[key];
            // console.log(value);
            console.log(value[value.length - 1].description);
          }
        }
      }
      console.log("\n\n\n");
      let verseE = "";
      let verseH = "";
      let verseS = "";
      let verseMeaningText = "";
      for (let key in objVerse) {
        if (objVerse.hasOwnProperty(key)) {
          if (key == "translations") {
            value = objVerse[key];
            // console.log(key, value);
            // console.log('\n\n\n');
            verseE = value[0].description;
            verseH = value[value.length - 1].description;
            // console.log(value[0].description);
            // console.log(value[1].description);
            // console.log(value[2].description);
            // console.log(value[3].description);
            // console.log(value[4].description);
            // console.log(value[5].description);
            // console.log(value[6].description);
            // console.log(value[7].description);
            // console.log(verseE);
            // console.log(verseH);
          }
          if (key == "text") {
            verseS = objVerse[key];
          }
          if (key == "commentaries") {
            value = objVerse[key];
            // console.log(value);
            verseMeaningText = value[value.length - 1].description;
            if (verseMeaningText.length > 1259) {
              verseMeaningText = verseMeaningText.slice(0, 1259) + "...";
            }
          }
        }
      }

      let val = Math.floor(1 + Math.random() * 4);
      verseContent.innerHTML =
        `<p id='verse-sanskrit' class=''>${verseS}</p>` +
        `<p id='verse-eng' class=''>${verseE}</p>` +
        `<p id='verse-hindi' class=''>${verseH}</p>`;
      verseMeaning.innerHTML =
        `<h2 id='verse-meaning-title'>Commentary</h2>` +
        `<h4 id='verse-meaning-para'>${verseMeaningText}</h4>`;
      verseContent.classList.toggle("hidden");
      verseMeaning.classList.toggle("hidden");
    } catch (error) {
      console.error(error);
    }
  }
  getData();
};

// let qa = {};
//we can also fetch data from local json file using fetch function, here qa.json is local json file
// fetch("qa.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // console.log(data)
//     qa = data;
//     console.log(qa);
//   });

let whatDiv = document.getElementById("what-div");
let howDiv = document.getElementById("how-div");
let whyDiv = document.getElementById("why-div");

//to add newline in string inside json we can use <br> tag inside string instead of the \n
// whatDiv.classList.toggle("hidden");
//   howDiv.classList.toggle("hidden");
//   whyDiv.classList.toggle("hidden");
function getAns(value) {
  //we toggle the class hidden two times to create a smooth transition effect
  // whatDiv.classList.toggle("hidden");
  // howDiv.classList.toggle("hidden");
  // whyDiv.classList.toggle("hidden");
  whatDiv.classList.toggle("hidden");
  howDiv.classList.toggle("hidden");
  whyDiv.classList.toggle("hidden");
  async function getDataAns() {
    try {
      const response = await fetch("qa.json");
      let qa = await response.json();
      whatDiv.innerHTML = `<h2>What is ${value}?</h2>
      <p>${qa[value]["What"]}</p>`;
      howDiv.innerHTML = `<h2>How is ${value}?</h2>
      <p>${qa[value]["How"]}</p>`;
      whyDiv.innerHTML = `<h2>Why is ${value}?</h2>
      <p>${qa[value]["Why"]}</p>`;

      whatDiv.classList.toggle("hidden");
      howDiv.classList.toggle("hidden");
      whyDiv.classList.toggle("hidden");
      if (document.body.clientWidth >= 1170) {
        document.body.scrollTop = 1825;
        document.documentElement.scrollTop = 1825;
      } else {
        document.body.scrollTop = 1550;
        document.documentElement.scrollTop = 1550;
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDataAns();
}

//   whatDiv.innerHTML = `<h2>What is ${value}?</h2>
//   <p>${qa.Universe.What}</p>`;
//   howDiv.innerHTML = `<h2>How is ${value}?</h2>
//   <p>${qa.Universe.How}</p>`;
//   whyDiv.innerHTML = `<h2>Why is ${value}?</h2>
//   <p>${qa.Universe.Why}</p>`;

//   whatDiv.classList.toggle("hidden");
//   howDiv.classList.toggle("hidden");
//   whyDiv.classList.toggle("hidden");

//   console.log(qa.Universe.What);
//   console.log(qa.Universe.How);
//   console.log(qa.Universe.Why);

// }
var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");
let aAll = document.querySelectorAll("#right a");
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x - 5 + "px";
  crsr.style.top = dets.y - 5 + "px";
  blur.style.left = dets.x - 100 + "px";
  blur.style.top = dets.y - 100 + "px";
  if (dets.y > 100) {
    crsr.style.zIndex = 1;
    blur.style.zIndex = 1;
  } else {
    crsr.style.zIndex = 99;
    blur.style.zIndex = 99;
  }
});

gsap.to("#header", {
  backgroundColor: "#fff",
  zIndex: "110",
  duration: 0.5,
  height: "14vh",
  scrollTrigger: {
    trigger: "#header",
    scroller: "body",
    // markers:true,
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  },
});

gsap.to(".header-sec", {
  borderColor: "black",
  duration: 0.1,
  height: "14vh",
  scrollTrigger: {
    trigger: "#header",
    scroller: "body",
    // markers:true,
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  },
});

// gsap.to("#main",{
//   backgroundColor:"#fff",
//   scrollTrigger:{
//     trigger:"#main",
//     scroller:"body",
//     markers:true,
//     start:"top -30%",
//     end:"top -100%",
//     scrub: 2
//   }

// })

// gsap.from(".qa-div",{
//   scale:0.8,
//   opacity: 0,
//   duration:1,
//   stagger: 0.3,
//   scrollTrigger:{
//     trigger:".qa-div",
//     scroller:"body",
//     start: "top 70%",
//     end: "top 65%",
//     scrub: true
//   }
// })

gsap.from("#colon1", {
  y: -70,
  x: -70,
  scrollTrigger: {
    trigger: "#colon1",
    scroller: "body",
    // markers: true,
    start: "top 55%",
    end: "top 45%",
    scrub: 4,
  },
});
gsap.from("#colon2", {
  y: 70,
  x: 70,
  scrollTrigger: {
    trigger: "#colon1",
    scroller: "body",
    // markers: true,
    start: "top 55%",
    end: "top 45%",
    scrub: 4,
  },
});

//to display the button on scroll or not
let topBtn = document.getElementById("topBtn");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 2000 ||
    (document.documentElement.scrollTop > 2000 &&
      document.body.clientWidth >= 1170)
  ) {
    topBtn.style.display = "block";
  } else if (
    document.body.scrollTop > 2340 ||
    (document.documentElement.scrollTop > 2340 &&
      document.body.clientWidth < 1170)
  ) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

//when user clicks on the button scroll to the top of our website
topBtn.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

let studyTopics = document.getElementById("study-topics");
if (document.body.clientWidth < 1170) {
  studyTopics.innerHTML = `<a href="https://www.youtube.com/watch?v=2mQ9OJGCNpc&list=PLMFNyeu_vMRioDjQw6aq5FaHmhqty6kVd" target="_blank" id="study-topic-1" 
  data-aos="flip-left" data-aos-offset="65" data-aos-duration="1000">
    <p>Complete Course on Bhagavad Gita</p>
    <img src="bhagavadgitaBG1.jpg" alt="">
  </a>
  <a href="https://www.youtube.com/watch?v=P14cRV-m6ZY&list=PLDqahtm2vA72ilWvaXhKRDUemEsz4VCKd&index=64" target="_blank" id="study-topic-2" 
  data-aos="flip-left" data-aos-offset="120" data-aos-duration="1000">
    <p>Lectures on Advaita Vedanta</p>
    <img src="advaitavedantaBg4.jpeg" alt="">
  
  </a>
  <a href="https://www.youtube.com/watch?v=HnXkv_ozPQw&list=PLa6CHPhFNfadNcnVZRXa6csHL5sFdkwmV&index=1" target="_blank" id="study-topic-3" 
  data-aos="flip-left" data-aos-offset="208" data-aos-duration="1000">
    <p>The Epic Mahabharat</p>
    <img src="mahabharatBg3.jpg" alt="">
  
  </a>
      
  <a href="https://www.youtube.com/watch?v=UyxPzCdZXTg&list=PLMFNyeu_vMRgdAryxpnFKmZsFaQu7E4Ni" target="_blank" id="study-topic-4" 
  data-aos="flip-left" data-aos-offset="245" data-aos-duration="1000">
    <p>Complete Course on Sanskrit</p>
    <img src="sanskritBg4.jpg" alt="">
  </a>`;
}
