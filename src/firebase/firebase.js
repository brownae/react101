import * as firebase from "firebase";
import config from "./config";

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// // child_removed
// database.ref("expenses").on("child_removed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_changed
// database.ref("expenses").on("child_changed", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// // child_added
// database.ref("expenses").on("child_added", snapshot => {
//   console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("value", snapshot => {
//   const expenses = [];

//   snapshot.forEach(childSnapshot => {
//     expenses.push({
//       id: childSnapshot.key,
//       ...childSnapshot.val()
//     });
//   });

//   console.log(expenses);
// });

// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   });

// database.ref("expenses").push({
//   description: "Pop Rocks",
//   note: "Strawberry flava",
//   amount: 17,
//   createdAt: 8675309
// });

// database.ref("notes").push({
//   title: "groceries",
//   body: "apples"
// });

// const onValueChange = database.ref().on("value", snapshot => {
//   const val = snapshot.val();
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
// });

// setTimeout(() => {
//   database.ref("name").set("Andrew Mead");
// }, 3500);

// setTimeout(() => {
//   database.ref("job/company").set("Rover");
// }, 5000);

// setTimeout(() => {
//   database.ref().off();
// }, 7000);

// setTimeout(() => {
//   database.ref("age").set(30);
// }, 10500);

// database
//   .ref("location/city")
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log("Error fetching data", e);
//   });

// database
//   .ref()
//   .set({
//     name: "Aaron Brown",
//     age: 35,
//     stressLevel: 6,
//     job: {
//       title: "software developer",
//       company: "google"
//     },
//     location: {
//       city: "Seattle",
//       country: "United States"
//     }
//   })
//   .then(() => {
//     console.log("Data is saved!");
//   })
//   .catch(e => {
//     console.log("This failed", e);
//   });

// database.ref().update({
//   stressLevel: 9,
//   "job/company": "Amazon",
//   "location/city": "Seattle"
// });

// database
//   .ref()
//   .remove()
//   .then(() => {
//     console.log("Success! things were removed");
//   })
//   .catch(e => {
//     console.log("No it was not removed", e);
//   });
