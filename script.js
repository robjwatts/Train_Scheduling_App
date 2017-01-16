console.log("lets get this working fam");

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyByC6YLyM_jhSJYW5VY7pVSSqs7GTXTgI8",
    authDomain: "train-schedule-2.firebaseapp.com",
    databaseURL: "https://train-schedule-2.firebaseio.com",
    storageBucket: "train-schedule-2.appspot.com",
    messagingSenderId: "706945630968"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#searchBtn").on("click", function() {

//data that we are capturing

  var train = $("#formGroupTrainName").val().trim();
  var destination = $("#formGroupDestinationName").val().trim();

  var frequency = $("#formGroupFrequency").val().trim();
  var firstTrainTime = $("#formGroupTime").val().trim();

  var trainIDs = []; //Holds the keys for each train to be used in removal and edits
  var globalIndex = 0; //Used to keep track of which element for removal and editing
  // var minutesAway = $("#").val().trim();


var newTrain = {

    train:train,
    destination:destination,
    frequency:frequency,
    firstTrainTime:firstTrainTime,
   
  };

//uploads data to new console

database.ref().push(newTrain);

//let's console log everything

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.frequency);
console.log(newTrain.firstTrainTime);

//clears all the text boxes
$("#formGroupTrainName").val("");
$("#formGroupDestinationName").val("");
$("#formGroupFrequency").val("");
$("#formGroupTime").val("");


//prevents moving to new page

return false;

});

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  //store everything into a variable

  var nutrain = childSnapshot.val().train;
  var nudestination = childSnapshot.val().destination;
  var nufrequency = childSnapshot.val().frequency;
  var nufirstTrainTime = childSnapshot.val().firstTrainTime;


  console.log(nutrain);
console.log(nudestination);
console.log(nufrequency);
console.log(nufirstTrainTime);


var firstTrainMoment = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTrainMoment), "minutes");
var remainder = diffTime % childSnapshot.val().frequency;

var minUntilTrain = childSnapshot.val().frequency - remainder;
var nextTrain = moment().add(minUntilTrain, "minutes");



$("#display").append("<tr><td id='trainDisplay'>" + childSnapshot.val().train + "</td><td id='destinationDisplay'>" + childSnapshot.val().destination + "</td><td id='frequencyDisplay'>" + "Every" + childSnapshot.val().frequency + "mins" + "</td><td id='nextArrivalDisplay'>" + moment(nextTrain).format("hh:mm A") + "</td><td id='minutesAwayDisplay'>" + minUntilTrain + "minutes until arrival" + "</td>");

})




  