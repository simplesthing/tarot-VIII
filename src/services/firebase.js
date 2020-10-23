import "firebase/auth";
import "firebase/firestore";

import firebase from "firebase/app";
import { firebaseConfig } from "../config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
//export const anlytics = firebase.analytics();
export const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  console.log("signing in with firebase google");
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const fetchSpreads = async () => {
  var spreads = [];
  try {
    const spreadsRef = await db.collection("spreads");
    return spreadsRef
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          spreads.push(doc.data());
        });
        return spreads;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  } catch (e) {
    console.log("error getting card data for spread", e);
  }
};

export const fetchCardData = async (spread) => {
  if (spread.length !== 10) return null;
  try {
    const cardsRef = await db.collection("cards").where("index", "in", spread);
    return cardsRef.get().then((querySnapshot) => {
      var cards = [];
      querySnapshot.forEach((doc) => {
        cards.push(doc.data());
      });
      return cards;
    });
  } catch (e) {
    console.log("error getting card data for spread", e);
  }
};
