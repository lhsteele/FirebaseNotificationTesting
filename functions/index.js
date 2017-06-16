// This registration token comes from the client FCM SDKs.
var functions = require('firebase-functions');
var admin = require('firebase-admin')
var registrationToken = "c3zeceh8w2I:APA91bES5ZRa0A-lU1---LGuFVjKVQ3dYqoFZkr22_uolrHKJ1UPRU-VwWGgWl3b-mv8w1XK1uV_K-_c2MN2OlLGj2M07u9oDfeDrvYQqsE18Oz55Ww8e4-PkAxMgZM2Wz0EqNt-jyBr";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://notificationtesting-6a447.firebaseio.com/"
});

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  notification: {
    title: "Name of App",
    body: "Someone has shared a journey with you."
  },
};

var options = {
  priority: "high"
}

exports.newEntry = functions.database.ref('/Started Journeys/{fireUserID}')
  .onWrite(event => {
    const original = event.data.val()
    console.log(original.SharedWithID)
    
    
    //below const needs to be changed to SharedWithID
    const sharedUserID = "12345"
    console.log(sharedUserID)
    var db = admin.database()
    var ref = db.ref("UserInfo")
    return ref.orderByKey().equalTo(sharedUserID).on("child_added", function(snapshot) {
      const deviceToken = snapshot.val()
      console.log(deviceToken)
    })
        
    //var deviceToken = snapshot.val()
    //console.log(deviceToken)  
      return admin.messaging().sendToDevice(registrationToken, payload, options)
      .then(function(response) {
      // See the MessagingDevicesResponse reference documentation for
      // the contents of response.
        console.log("Successfully sent message:", response);
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });
   
})








