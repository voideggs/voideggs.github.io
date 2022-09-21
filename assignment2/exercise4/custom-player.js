/* retrieve the elements we'll be using and assigning them variables */

/* you can see that I'm using a mix of getElementById and getElementsByClassName to retrieve them - as
   discussed last week getElementsByClassName returns a list, however knowing that there is only one 
   element with the associated class allows me to use the array index of [0] - the first item - to
   return a singular element - if there were multiple elements with that class it would return the first
   element  */

let media = document.getElementById("media");
let controls = document.getElementsByClassName("controls")[0];

let play = document.getElementsByClassName("play")[0];
let stop = document.getElementsByClassName("stop")[0];
let rwd = document.getElementsByClassName("rwd")[0];
let fwd = document.getElementsByClassName("fwd")[0];
let mute = document.getElementsByClassName("mute")[0];
let full = document.getElementsByClassName("full")[0];
console.log(mute)

let timerWrapper = document.getElementsByClassName("timer")[0];
let timer = document.getElementsByClassName("timer-span")[0];
let timerBar = document.getElementsByClassName("timer-bar")[0];

/* I'm also declaring some blank variables here that will later be assigned to intervals - declaring them
   outside of the functions like this means that they will have what's called "global scope" meaning they 
   will be accessible within different functions */

/* for more information check out the link on modules to JS Scope */

let intervalFwd;
let intervalRwd;

/* removing the default controls and showing the custom controls */

/* this is done in the js so that if for whatever reason the js doesn't load the player will 
   use the default controls */

media.removeAttribute("controls");
controls.style.visibility = "visible";

/* add an event listener for clicking the play/pause button and then define it's functionality */

play.addEventListener('click', playPauseMedia);

function playPauseMedia(){
  
  /* the four lines below are cancelling the fast forward or rewind functions if they are running - 
     the first two lines remove the class used and the second two make sure the intervals stop */

  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  /* like we've previously seen this code uses an if statement to do something based on a bool - 
     media.paused will return true if paused and false if playing so we can make the button click
     either pause or play and then change it's icon depending on the current context */

  if(media.paused){
    play.setAttribute('data-icon', 'C');
    media.play();
  } else {
    play.setAttribute('data-icon', 'D');
    media.pause();
  }
}

/* add an event listener for clicking the stop button and the media finishing, and then define 
   their functionality */

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  /* reset the current time to 0 - the beginning */
  media.currentTime = 0;
  play.setAttribute('data-icon', 'D');
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

/* add an event listener for clicking the fwd & rwd buttons and then define their functionality */

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if(rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if(fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward(){
  /* if currentTime is back at the start stop the windback so it doesn't overshoot 0 */
  if(media.currentTime <=3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward(){
  /* if currentTime is at the end of curation stop the fast forward so it doesn't overshoot */
  if(media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

var elem = document.getElementById("media");

function Fullscreen() {

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* add an event listener for the elapsed time and then define it's functionality */

media.addEventListener("timeupdate", setTime);

function setTime(){
  console.log("update")
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);

  let minuteValue = minutes.toString().padStart(2, "0");
  let secondValue = seconds.toString().padStart(2, "0");

  /* both this line and the one four lines below uses what's called template literals to
     dynamically create strings - note the use of ` not ' or " to define the string and ${}
     to define the input variable */

  /* this is like adding strings together - the other way to write this out would be:
     minuteValue + ":" + secondValue - by adding the variables to the string you convert them 
     all into a single string, however it can get messy so instead template literals are often
     used to write them all in one easier to read statement */

  /* for more information check out the link on modules to String Interpolation */

  let mediaTime = `${minuteValue}:${secondValue}`;
  
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}

//mute button

mute.addEventListener("click", muteUnmute);

function muteUnmute(){
  if (media.muted){
    media.muted = false;
    play.setAttribute('data-icon', 'C');
  } else {
    media.muted = true;
    play.setAttribute('data-icon', 'C');
  }
}

//fullscreen script

const fullscreenButton = document.getElementsByClassName('fullscreen');
const videoContainer = document.getElementById('media');

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Need this to support Safari
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

fullscreenButton.onclick = toggleFullScreen;

const fullscreenIcons = fullscreenButton.querySelectorAll('use');

// this changes the icon for fullscreen mode

function updateFullscreenButton() {
  fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));

  if (document.fullscreenElement) {
    fullscreenButton.setAttribute('data-title', 'Exit full screen (f)')
  } else {
    fullscreenButton.setAttribute('data-title', 'Full screen (f)')
  }
}

videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);