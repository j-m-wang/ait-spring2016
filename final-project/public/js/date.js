var currentDate = new Date();
var currentHour = currentDate.getHours();
var text = document.getElementById('greeting');
console.log(currentHour);

if (currentHour >= 6 && currentHour < 12) {
  text.innerHTML = 'Good Morning';
  document.body.style.backgroundImage = "url(https://media.giphy.com/media/xNjBdnD9xFsf6/giphy.gif)";
} else if (currentHour >= 12 && currentHour < 20) {
  text.innerHTML = 'Good Afternoon';
  document.body.style.backgroundImage = "url(https://media.giphy.com/media/3oGRFoJIFAMD7Gzyxi/giphy.gif)";
} else {
  text.innerHTML = 'Good Night';
  // document.body.style.backgroundImage = "url(https://media.giphy.com/media/UqWwKG1XGutck/giphy.gif)";
  document.body.style.backgroundImage = "url(https://45.media.tumblr.com/eb074ac72661275a8a2faef70b6fbb97/tumblr_o0dvn8GaRf1upvbufo1_540.gif)";

}
