window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const imageElement = document.querySelector('img[alt="No image selected"]');
  const audioElement = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');
  const jsConfetti = new JSConfetti();

  const hornData = {
    'air-horn': {
      img: 'assets/images/air-horn.svg',
      audio: 'assets/audio/air-horn.mp3'
    },
    'car-horn': {
      img: 'assets/images/car-horn.svg',
      audio: 'assets/audio/car-horn.mp3'
    },
    'party-horn': {
      img: 'assets/images/party-horn.svg',
      audio: 'assets/audio/party-horn.mp3'
    }
  };

  hornSelect.addEventListener('change', function() {
    const selectedHorn = hornSelect.value;
    if(hornData[selectedHorn]){
      imageElement.src = hornData[selectedHorn].img;
      imageElement.alt = selectedHorn.replace('-', ' ') + ' image';
      audioElement.src = hornData[selectedHorn].audio;
    }
  });


  volumeSlider.addEventListener('input', updateVolume);

  function updateVolume() {
    const volumeValue = parseInt(volumeSlider.value, 10);
    let volumeImagePath;

    if (volumeValue === 0) {
      volumeImagePath = 'assets/icons/volume-level-0.svg';
    } 
    else if (volumeValue < 33) {
      volumeImagePath = 'assets/icons/volume-level-1.svg';
    } 
    else if (volumeValue < 67) {
      volumeImagePath = 'assets/icons/volume-level-2.svg';
    } 
    else {
      volumeImagePath = 'assets/icons/volume-level-3.svg';
    }

    volumeIcon.src = volumeImagePath;
    audioElement.volume = volumeValue / 100;
  }

  playButton.addEventListener('click', function() {
    audioElement.play();
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}
