// the video of the user
let video;

// store the coordinates of the users nose
let face;

function setup() {


  createCanvas(390, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);

  // Create a new poseNet method
    const poseNet = ml5.poseNet(video, modelLoaded);

    // When the model is loaded
    function modelLoaded() {
        console.log("Model Loaded!");
    }
    // Listen to new 'pose' events
    poseNet.on("pose", function(results) {
        poses = results;
        if(poses && poses != []) {
            face = poses[0].pose.keypoints;
        }
    });

}

function draw() {
  background(255);
  image(video, 0, 0, 320, 240);
  filter(INVERT);

  // draw the users face
  if(face) {

    let size = 13;
    fill("red");

    // loop through the face
    for(let part of face) {
        let pos = part.position;
        ellipse(pos.x, pos.y, size, size);
        textSize(9);
        text(part.part, pos.x + 10, pos.y);
    }


  } else {
      console.log("no face detected!");
  }

}