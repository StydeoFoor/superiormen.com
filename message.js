import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
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

if (!loggedInUser && !window.location.pathname.includes("login.html")) {
  window.location.href = "login.html";
  return;
}

// Send message function using 'set'
function _0x19ae(){const _0x37dc4b=['762620RUABox','514315GIxaQC','6BvelNl','2594QhdexI','nigger','ass','2186980pARnUa','shit','1492164jBqdeg','38DZBpSD','563382ZOXJJx','1544FIFxTf','skibidi','nigga','sigma','3717YjJCBE'];_0x19ae=function(){return _0x37dc4b;};return _0x19ae();}const _0x5f71e5=_0xba77;function _0xba77(_0x2cfab9,_0x85030c){const _0x19ae0c=_0x19ae();return _0xba77=function(_0xba778f,_0x23ceba){_0xba778f=_0xba778f-0x105;let _0x38d1b4=_0x19ae0c[_0xba778f];return _0x38d1b4;},_0xba77(_0x2cfab9,_0x85030c);}(function(_0x1357c2,_0x58eb11){const _0xad198=_0xba77,_0x190cab=_0x1357c2();while(!![]){try{const _0x3d5dd0=-parseInt(_0xad198(0x109))/0x1*(parseInt(_0xad198(0x10f))/0x2)+-parseInt(_0xad198(0x110))/0x3+parseInt(_0xad198(0x106))/0x4+parseInt(_0xad198(0x107))/0x5*(-parseInt(_0xad198(0x108))/0x6)+-parseInt(_0xad198(0x105))/0x7*(parseInt(_0xad198(0x111))/0x8)+parseInt(_0xad198(0x10e))/0x9+parseInt(_0xad198(0x10c))/0xa;if(_0x3d5dd0===_0x58eb11)break;else _0x190cab['push'](_0x190cab['shift']());}catch(_0x11687a){_0x190cab['push'](_0x190cab['shift']());}}}(_0x19ae,0x20673));const bannedWords=['fuck',_0x5f71e5(0x113),_0x5f71e5(0x10a),_0x5f71e5(0x10b),_0x5f71e5(0x10d),_0x5f71e5(0x112),_0x5f71e5(0x114)]; // Replace with your words

function containsBannedWords(message) {
  // Check if the message contains any banned words (case-insensitive)
  const regex = new RegExp(`\\b(${bannedWords.join("|")})\\b`, "i");
  return regex.test(message);
}

function sendMessage(message) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    console.log("User is not logged in");
    return;
  }

  // Validate the message length
  if (message.trim().length > 500) {
    alert("Message exceeds the 500-character limit. Please shorten your message.");
    return;
  }

  // Check for banned words
  if (containsBannedWords(message)) {
    alert("Your message was moderated and not sent.");
    return;
  }

  // Get reference to 'chats' node in Firebase
  const messageRef = ref(database, "chats/" + Date.now()); // Timestamp as unique ID for each message

  // Set the message data in Firebase
  set(messageRef, {
    username: loggedInUser.name,
    message: message.trim(),
    timestamp: Date.now(),
  })
    .then(() => {
      console.log("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

// Fetch and display messages using 'get'
function fetchMessages() {
  const messagesRef = ref(database, "chats/"); // Reference to your 'chats' node

  // Fetch messages once from Firebase
  get(messagesRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const messages = snapshot.val();
        displayMessages(messages);
      } else {
        console.log("No messages available.");
      }
    })
    .catch((error) => {
      console.error("Error fetching messages: ", error);
    });
}

// Function to display messages in the chat box
function displayMessages(messages) {
  const chatBox = document.getElementById("chat-box");
  if (!chatBox) {
    console.error("HTML element with ID 'chat-box' is missing.");
    return;
  }

  chatBox.innerHTML = ""; // Clear the chat box

  if (messages) {
    Object.keys(messages).forEach((key) => {
      const message = messages[key];

      // Create a container for each message
      const messageElement = document.createElement("div");
      messageElement.textContent = `${message.username}: ${message.message}`;
      
      // Apply styles for spacing
      messageElement.style.margin = "10px 0"; // Add vertical spacing between messages
      messageElement.style.borderTop = "1px solid #ccc"; // Optional border for clarity

      chatBox.appendChild(messageElement);
    });
  } else {
    chatBox.innerHTML = "<div>No messages to display</div>";
  }
}

// Listen for real-time updates (whenever new messages are added)
const messagesRef = ref(database, "chats/");
onValue(messagesRef, (snapshot) => {
  const messages = snapshot.val();
  displayMessages(messages);
});

// Call fetchMessages to load initial messages when the page loads
window.onload = () => {
  fetchMessages(); // Load messages on page load (optional if onValue is enough)
};

// Get references for input and send button
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Add event listener for Send button
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  console.log("Message length:", message.length);
  if (message.length > 500) {
    alert("Message exceeds 500 characters!");
    return;
  }
  if (message.length > 0) {
    sendMessage(message);
    messageInput.value = "";
  }
});
