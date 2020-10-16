// Imports
const firebaseConfig = require("../../config");
const firestoreService = require("firestore-export-import");
const serviceAccount = require("./serviceAccount.json");
const tarot = require("./.data/tarot8.json");

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log("Initialzing Firebase");
    await firestoreService.initializeApp(
      serviceAccount,
      firebaseConfig.databaseURL
    );
    console.log("Firebase Initialized");

    await firestoreService.restore(tarot);
    console.log("Upload Success");
  } catch (error) {
    console.log(error);
  }
};

jsonToFirestore();
