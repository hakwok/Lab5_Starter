// explore.js

let speechSynthesis;

window.addEventListener("DOMContentLoaded", init);

function init() {
  speechSynthesis = window.speechSynthesis;
  initVoiceSelect();
  initTalkButton();
}

function initVoiceSelect() {
  let voiceSelect = document.getElementById("voice-select");
  speechSynthesis.addEventListener("voiceschanged", populateVoices);

  function populateVoices() {
    let voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      if (voice.default) {
        option.textContent += " — DEFAULT";
      }
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });
  }
}

function initTalkButton() {
  let talkButton = document.getElementsByTagName("button")[0];
  let textArea = document.getElementById("text-to-speak");
  let faceImage = document.getElementsByTagName("img")[0];

  talkButton.addEventListener("click", () => {
    let voiceName = document.getElementById("voice-select").selectedOptions[0].getAttribute("data-name");
    let text = textArea.value;
    playText(text, voiceName, faceImage);
  });
}

function playText(text, voiceName, faceImage) {
  let utterance = new SpeechSynthesisUtterance(text);
  let voices = speechSynthesis.getVoices();
  let selectedVoice = voices.find(voice => voice.name === voiceName);
  if(selectedVoice){
    utterance.voice = selectedVoice;
  }
  utterance.onstart = () => {
    faceImage.src = "assets/images/smiling-open.png";
  };
  utterance.onend = () => {
    faceImage.src = "assets/images/smiling.png";
  };
  speechSynthesis.speak(utterance);
}
