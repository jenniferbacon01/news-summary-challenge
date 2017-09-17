var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "7ab590cd",
  application_key: "04144cb9bb6d4e1bcc5a2dfe205e95e6"
});


textapi.summarize({
  url: 'https://www.theguardian.com/teacher-network/2017/jul/04/is-technology-delivering-in-schools-our-panel-debates',
  sentences_number: 3
}, function(error, response) {
  if (error === null) {
    response.sentences.forEach(function(s) {
      console.log(s);
    });
  }
});
