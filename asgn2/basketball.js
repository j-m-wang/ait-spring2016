// basketball.js

//importing data
var request = require('request');
var team1 = [];
var team2 = [];
var team1Name, team2Name;
request("http://foureyes.github.io/csci-ua.0480-spring2016-010/homework/02/0021500750.json", function teamInfo (error, response, body) {
    var x = 1;
    data = JSON.parse(body.slice(0, body.length));
    //grabs team names
    team1Name = data.players[0].team_name;
    while (data.players[x].team_name === team1Name) {
      x++;
    }
    team2Name = data.players[x].team_name;

    makeTeams();
    printGameID();
    finalScore();
    mostRebounds();
    guard3Pointer();
    oneAssist();
    mostFreeThrows();
    moreTOThanA();

    if (!(data.next==="")) {
      team1 = [];
      team2 = [];
      request(data.next, teamInfo);
    }
});

//divides players into teams
function makeTeams() {
  for (var i = 0; i < data.players.length; i++) {
    if (data.players[i].team_name === team1Name) {
      team1 = team1.concat(data.players[i]);
    } else {
      team2 = team2.concat(data.players[i]);
    }
  }
}

function printGameID() {
  console.log("Game ID: " + data.id);
  console.log("=====");
}

function finalScore() {
  var team1Score = 0;
  var team2Score = 0;
  team1.forEach(function(player) {
    team1Score += ((player.three_pointers_made * 3) + ((player.field_goals_made - player.three_pointers_made) * 2) + (player.free_throws_made)*1);
  });
  team2.forEach(function(player) {
    team2Score += ((player.three_pointers_made * 3) + ((player.field_goals_made - player.three_pointers_made) * 2) + (player.free_throws_made)*1);
  });

  console.log(team1Name, team1Score);
  console.log(team2Name, team2Score);
  team1Score = 0;
  team2Score = 0;
}

function mostRebounds() {
  var currentHigh = 0;
  var firstName = "";
  var lastName = "";
  data.players.forEach(function(player) {
    var tempHigh = (player.rebounds_offensive*1) + (player.rebounds_defensive*1);
    if (tempHigh > currentHigh) {
      firstName = player.first_name;
      lastName = player.last_name;
      currentHigh = tempHigh;
    }
  });
  console.log("* Most rebounds: " + firstName + " " + lastName + " with " + currentHigh);
}

function guard3Pointer() {
  var currentMost = 0;
  var first = "";
  var last = "";
  var made = 0;
  var attempt = 0;
  var position = "";
  data.players.forEach(function(player) {
    if (player.position_short.includes('G') && (player.three_pointers_attempted > 0)) {
      if (((player.three_pointers_made / player.three_pointers_attempted)*1) > currentMost) {
        first = player.first_name;
        last = player.last_name;
        made = player.three_pointers_made;
        attempt = player.three_pointers_attempted;
        position = player.position_short;
        currentMost = ((player.three_pointers_made / player.three_pointers_attempted)*1);
      }
    }
  });
  console.log("* Guard (" + position + ") with highest 3 point percentage: " + first + " " + last + " at %" + ((made/attempt)*100.00) + " (" + made + "/" + attempt + ")");
}

function oneAssist() {
  var assistArr = data.players.filter(function(player) {
    if (player.assists > 0) {
      return player;
    }
  });
  console.log("There were " + assistArr.length + " players that had at least one assist.");
}

function mostFreeThrows() {
  var team1FT = [];
  var team2FT = [];

  team1.forEach(function(player) {
    team1FT = team1FT.concat(player.free_throws_attempted);
  });
  team2.forEach(function(player) {
    team2FT = team2FT.concat(player.free_throws_attempted);
  });

  //use map to ensure addition and not concatenation
  var tempTeam1 = team1FT.map(function(x) {
    return x * 1;
  });
  var tempTeam2 = team2FT.map(function(y) {
    return y * 1;
  });

  var totalTeam1FT = tempTeam1.reduce(function(a, b) {
    return a + b;
  });
  var totalTeam2FT = tempTeam2.reduce(function(a, b) {
    return a + b;
  });
  if (totalTeam1FT > totalTeam2FT) {
    console.log("* " + team1Name + " attempted the most free throws... " + team1Name + ": " + totalTeam1FT + " " + team2Name + ": " + totalTeam2FT);
  } else {
    console.log("* " + team2Name + " attempted the most free throws... " + team1Name + ": " + totalTeam1FT + " " + team2Name + ": " + totalTeam2FT);
  }
  team1FT = [];
  team2FT = [];
}

function moreTOThanA() {
  console.log("* " + team1Name + " players with more turnovers than assists:");
  team1.forEach(function(player) {
    if (player.turnovers > player.assists) {
      console.log("   * " + player.first_name + " " + player.last_name + " has an assist to turnover ratio of " + player.assists + ":" + player.turnovers);
    }
  });
  console.log("* " + team2Name + " players with more turnovers than assists:");
  team2.forEach(function(player) {
    if (player.turnovers > player.assists) {
      console.log("   * " + player.first_name + " " + player.last_name + " has an assist to turnover ratio of " + player.assists + ":" + player.turnovers);
    }
  });
}
