
leftWristX = 0
leftWristY = 0
rightWristX = 0
rightWristY = 0
scoreleftwrist = 0
scorerightwrist = 0

harrypotter=""
peterpan=""
song1_status=""
song2_status=""
function setup () {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", gotPoses)
}

function preload(){
    harrypotter = loadSound("music.mp3");
    peterpan = loadSound("music2.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);
    song1_status = harrypotter.isPlaying()
    song2_status = peterpan.isPlaying()
    
    fill("red")
    stroke("red")
    
    if(scoreleftwrist > 0.2){
    
    circle(leftWristX, leftWristY, 20)
    harrypotter.stop()
    if(song2_status == false){
        peterpan.play()
        document.getElementById("song_name").innerHTML = "Playing Peterpan"
    }}
    if(scorerightwrist > 0.2){
    
        circle(rightWristX, rightWristY, 20)
        peterpan.stop()
        if(song1_status == false){
            harrypotter.play()
            document.getElementById("song_name").innerHTML = "Playing Harry potter"
        }
}

    
    
}

function modelLoaded(){
    console.log('PoseNet is Initialised')

}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreleftwrist = results[0].pose.keypoints[9].score;
        leftWristX =results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scorerightwrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}