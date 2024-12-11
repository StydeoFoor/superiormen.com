import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDptDbjGK0QOPFTZyIh_RETz9nf0k4jKrA",
  authDomain: "superior-men.firebaseapp.com",
  databaseURL: "https://superior-men-default-rtdb.firebaseio.com",
  projectId: "superior-men",
  storageBucket: "superior-men.firebasestorage.app",
  messagingSenderId: "511878136688",
  appId: "1:511878136688:web:c316363351d7a4791f45b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get Firebase Database instance

// Send message function using 'set'
function sendMessage(message) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    console.log("User is not logged in");
    return;
  }

  if (message.length > 500) {
    alert("Message exceeds the 500-character limit. Please shorten your message.");
    return;
  }

  // Get reference to 'chats' node in Firebase
  const messageRef = ref(database, "privChats/" + Date.now()); // Timestamp as unique ID for each message

  // Set the message data in Firebase
  set(messageRef, {
    username: loggedInUser.name,
    message: message,
    timestamp: Date.now(),
  })
    .then(() => {
      console.log("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}


// Function to display messages in the chat bo

// Listen for real-time updates (whenever new messages are added)

// Call fetchMessages to load initial messages when the page loads

// Get references for input and send button
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Add event listener for Send button
sendButton.addEventListener("click", function () {
  const message = messageInput.value.trim();
  if (message) {
    sendMessage(message); // Send message to Firebase
    messageInput.value = ""; // Clear the input after sending
  }
});
