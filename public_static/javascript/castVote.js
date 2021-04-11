function votedORnot(){
    fetch('/votedORnot')
    .then(response => response.json())    // one extra step
    .then(response => {
      console.log(response);
      if(response){
        $("#voteForm").hide();
      }
    })
}

function vote(){
  var candidateId = $('#candidatesSelect').val();
  fetch('./vote',
  {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: candidateId, // send only candidate id
    })
  })
  .then(function (response) {
    console.log("vote casted!!, page will refresh");
    viewCandidates();
  })
  .catch(function (error) {
    console.error(error);
  });
}

function viewCandidates(){

    let ballotID, canCount; 
    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();
    var candidatesSelect = $('#candidatesSelect');
    candidatesSelect.empty();


    fetch('/viewCandidates')
    .then(response => response.json())    // one extra step
    .then(response => {
      //console.log("inside viewCandidates: ", response);
      document.getElementById("account").innerHTML = response.account;

      ballotID = response.id;
      canCount = response.canCount;
    })
    .then(() => { 
        for (var i = 1; i <= canCount; i++) { 
            fetch('./candidate_i',
            {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: i, // send only candidate id
              })
            }).then(response => response.json()) 
            .then(function (response) {
              // render candidate vote count
              var row = "<tr><th>" + response.id + 
                          "</th><td>" + response.name +
                          "</th><td>" + response.voteCount + "</td></tr>";

              candidatesResults.append(row);


              // Render candidate ballot option
              var candidateOption = "<option value='" + response.id + 
                                  "' >" + response.name + "</ option>";
              candidatesSelect.append(candidateOption);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
    }).then( votedORnot() )
    .catch(error => console.error(error));
}
viewCandidates();
