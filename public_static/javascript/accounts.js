let selectedAccount;

fetch('/getAccounts')
  .then(response => response.json())    // one extra step
  .then(response => {
    for(let i = 0; i < response.length; i++){
      var curraccount = response[i];
      // jquery 
      $('#options').append("<option value='"+curraccount+"'>"+curraccount+"</option>");
    }
  }).then(() => {
    fetch('/getBallotCount')
    .then(response => response.json()) 
    .then(response => {
      for(let i = 1; i <= response.ballotCount; i++){
        $('#ballotOptions').append("<option value='"+i+"'>"+i+"</option>");
      }
    }) 
  })
  .catch(error => console.error(error));

// jquery
  $('#submit').click( () => {
    selectedAccount = $('#options').val();

    $.post('/setAccount', {sender : selectedAccount}, function (response) {
      console.log("account: ", selectedAccount);
      $('#account').text(selectedAccount);
      console.log("account added??", response);
    })

  })

  $('#submitBallot').click( () => {
    id = $('#ballotOptions').val();
    
    $.post('/setBallotID', {id : id}, function (response) {
      console.log("ballot selected??", id, response);
    })

  })