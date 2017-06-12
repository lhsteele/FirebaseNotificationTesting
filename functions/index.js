// This registration token comes from the client FCM SDKs.
var functions = require('firebase-functions');
var admin = require('firebase-admin')
var registrationToken = "eUoYdUCtU9Y:APA91bFzXg6hMjB65S8eFOqgL161kO34Xtyo9NOP7fgvhsVxJs0Cikd5mTaSZFYW39WXqV0mvwprDeGI8hN-7atQYeLvzDceVqreGiDCxMotlGCArYxiJM-pXZ91sDIAQX7ia-9kE7yA";

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
      console.log(original)
      console.log(original.SharedWithID)
      //const journeyUserID = event.params.UsersFireID
      //Need to find a way access the value of key SharedWithID assign that
      //to sharedUserID.
      //const sharedUserID = event.data.child('SharedWithID')
      const sharedUserID = original.SharedWithID
      console.log(sharedUserID)
      //const testValue = sharedUserID
      //return event.data.ref.parent.child('JourneySharedWith').set(sharedUserID)
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




