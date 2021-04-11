const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


/************ serve static files *************/
app.use(express.static('public_static'));
//app.get('/', express.static('home'));
var publicPath = path.join(__dirname, 'public_static');

app.get('/home', function (req, res) {
  res.sendFile(publicPath + '/home.html');
});
app.get('/vote', function (req, res) {
  res.sendFile(publicPath + '/vote.html');
});

/************ render *************/
app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});

app.post('/setAccount', (req, res) => {
  console.log("**** POST /setAccount ****");
  console.log(req.body);

  let sender = req.body.sender;
  truffle_connect.setAccount(sender, (response) => {
    res.send(response);
  });
});

app.get('/getBallotCount', (req, res) => {
  console.log("**** GET / getBallotCount ****");
  truffle_connect.getBallotCount(function (answer) {
    res.send(answer);
  })
});

app.post('/ballot_i', (req, res) => {
  console.log("**** POST /ballot_i ****");
  let id = req.body.id;

  truffle_connect.ballot_i(id, (response) => {
    res.send(response);
  });
});

app.post('/setBallot', (req, res) => {
  console.log("**** post /setBallot ****");
  console.log("data to post: ", req.body);
  
  let name = req.body.name;
  let startTime = req.body.startTime;
  let endTime = req.body.endTime;
  let canString = req.body.canString;

  truffle_connect.setBallot(name, startTime, endTime, canString, (response) => {
    res.send(response);
  });
});

app.post('/setBallotID', (req, res) => {
  console.log("**** POST /setBallotID ****");
  console.log(req.body);

  let id = req.body.id;
  truffle_connect.setBallotID(id, (response) => {
    res.send(response);
  });
});

app.get('/viewCandidates', (req, res) => {
  console.log("**** GET / viewCandidates ****");
  truffle_connect.viewCandidates(function (answer) {
    res.send(answer);
  })
});

app.post('/candidate_i', (req, res) => {
  console.log("**** POST /candidate_i ****");
  let id = req.body.id; 

  truffle_connect.candidate_i(id, (response) => {
    res.send(response);
  });
});

app.get('/votedORnot', (req, res) => {
  console.log("**** GET / votedORnot ****");
  truffle_connect.votedORnot(function (answer) {
    res.send(answer);
  })
});

app.post('/vote', (req, res) => {
  console.log("**** POST /vote ****");
  let id = req.body.id; 

  truffle_connect.vote(id, (response) => {
    res.send(response);
  });
});

app.listen(port, () => {
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);
});
