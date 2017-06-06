var functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
	//response.send("Hello from Lisa!");
//});

//define and export a new function called "Sanitize Post"
//On other side of =, specify the event I want to trigger on.
//The path is posts, and it uses a wildcard denoted by curly brackets, to match the push Id of the post in that path.
/*
exports.sanitizePost = functions.database
	.ref('/posts/{pushId}')
	//interested in write events
	.onWrite(event => {
		const post = event.data.val()
		if (post.sanitized) {
			return
		}
		console.log("Sanitizing new post" + event.params.pushId)
		console.log(post)
		post.sanitized = true
		post.title = sanitize(post.title)
		post.body = sanitize(post.body)
		//Don't want this function to return before the write back to the db is complete.
		//.set method is asynchronous, meaning it happens right away. Write happens in the background.
		//Cloud functions uses something called a promise to track the completion of that write. 
		//Without this, there's a possibility the write may not fully complete and you lose data.
		//need to ensure to return the promise, or else the
		const promise = event.data.ref.set(post)
		return promise
		//or:
		// return event.data.ref.set(post)
	})

	function sanitize(s) {
		var sanitizedText = s 
		sanitizedText = sanitizedText.replace(/\bstupid\b/ig, "wonderful")
		return sanitizedText
	}
	*/
	//Listens for new messages added and adds a new child to the entry. (just for testing)
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
			return event.data.ref.parent.child('JourneySharedWith').set(sharedUserID)
		})

