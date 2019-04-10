/**
 * 
 */
let width = 320    // We will scale the photo width to this
let height = 0     // This will be computed based on the input stream

let streaming = false

let video = null
let canvas = null
let photo = null
let startbutton = null
let constrains = { video: true, audio: true }
let recorder = null
let record_data = []

function startup() {
  video = document.getElementById('video')
  canvas = document.getElementById('canvas')
  photo = document.getElementById('photo')
  //start and stop is the same button.
  startbutton = document.getElementById('button')
  stopbutton  = document.getElementById('button')
  downloadbutton = document.getElementById('downloadButton')

  var timer;
  function stopVideo() {
    
    videoStart()
    
    if (resetMap == 1) {
      clearInterval(timer);
    }
  }
  
  timer = setInterval(
  stopVideo(), 1000);

  video.addEventListener('canplay', function(ev){
    if (!streaming) {
      //height = video.videoHeight / (video.videoWidth/width)

      video.setAttribute('width', width)
      video.setAttribute('height', height)
      streaming = true
    }
  }, false)

  startRecorder()

  startbutton.addEventListener('click', function(ev){
    recorder.start()
    ev.preventDefault()
  }, false);

  stopbutton.addEventListener('click', function(ev) {
    recorder.stop()
  })

  downloadbutton.addEventListener('click', function(ev) {
    console.log(record_data)
    var blob = new Blob(record_data, { type: 'video/webm' })
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display:none'
    a.href = url;
    a.download = 'test.webm'
    a.click()
    window.URL.revokeObjectURL(url)
  })
}

function videoStart() {
  streaming = false
  console.log(streaming)
  navigator.mediaDevices.getUserMedia(constrains)
  .then(function(stream) {
      video.srcObject = stream
      video.play()
  })
  .catch(function(err) {
      console.log("An error occured! " + err)
  })
}

function startRecorder() {
  navigator.mediaDevices.getUserMedia(constrains)
  .then(function (stream) {
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = function (e) {
      var testvideo = document.getElementById('recordedVideo')
      testvideo.setAttribute('controls', '')
      testvideo.setAttribute('width', width)
      testvideo.setAttribute('height', height)
      var outputdata = window.URL.createObjectURL(e.data)
      record_data.push(e.data)
      testvideo.src = outputdata
    }
  })
}

//startup()
