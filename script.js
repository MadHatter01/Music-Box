navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    const audioContext = new AudioContext();
    const microphone = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    microphone.connect(analyser);

    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function checkMicrophoneInput() {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      const scaleValue = 1 + average / 100;
      const animatedElement = document.querySelector(".anime-obj");
      animatedElement.style.transform = `scale(${scaleValue})`;

      requestAnimationFrame(checkMicrophoneInput);
    }

    checkMicrophoneInput();
  })
  .catch(function (error) {
    console.error("Error accessing microphone:", error);
  });
