// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDAojSdulUD41V4tRz0mGy0dda0D1gbHwM",
  authDomain: "premiere-tickets-web.firebaseapp.com",
  projectId: "premiere-tickets-web",
  storageBucket: "premiere-tickets-web.appspot.com",
  messagingSenderId: "947945408323",
  appId: "1:947945408323:web:0af2a1c9cc32596595d1f6",
  measurementId: "G-FP8BCMV2L6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Import additional functions
import { uploadBytesResumable } from "firebase/storage";

// Modified uploadImage function
const uploadImage = async (file) => {
  try {
    // Create a reference to the storage bucket and specify the file path
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload the file to the storage bucket
    await uploadBytes(storageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);
    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
export { uploadImage };
