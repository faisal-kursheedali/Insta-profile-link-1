const USER_ID = localStorage.getItem("userID")
  ? localStorage.getItem("userID")
  : Date.now() + Math.random();
localStorage.setItem("userID", USER_ID);
const dateTime = new Date().toISOString();

fetch(`http://localhost:3000/api/insta_load/${USER_ID}/${dateTime}`)
  .then((res) => res.json())
  .then((val) => console.log(val));
//input
var username = prompt("what's your name?");
username === null || username === "" ? (username = "null") : null;
fetch(
  `http://localhost:3000/api/insta_name_give/${username.toString()}/${USER_ID}/${dateTime}`
)
  .then((res) => res.json())
  .then((val) => console.log(val));

// processing
var welcomemessage =
  username +
  ", you're special✨ & You deserve a star💫\n\nI appreciate your curiosity to know about me.\nThanks for caring.\nYou brighten my day and make me happy😀 \n\n You’re the best💛, thank you " +
  username;
//output
alert(welcomemessage);
