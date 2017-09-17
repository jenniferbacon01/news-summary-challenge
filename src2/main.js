(function(exports) {
  function Page (){
  };
  Page.prototype.getNewsFromApi = function(guardianApi= "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search", doc = document) {
    var newsDataObjArray;
    var that = this;
    var ourRequest = new XMLHttpRequest();
    // https://content.guardianapis.com/search?api-key=3e8ee72b-5cd3-4951-9e66-d32ada386a74
    // https://content.guardianapis.com/search?q=debates&api-key=test
    ourRequest.open('GET', guardianApi)
    ourRequest.onload = function() {
      var ourData = JSON.parse(ourRequest.responseText);
      newsDataObjArray = ourData.response.results;
      that.newsDataObjArray = newsDataObjArray;
      // console.log(that);
      // console.log(that.newsDataObjArray)
      that.showHeadlines(doc);
      that.listenForHashChanges();
    };
    ourRequest.send();
  };

  Page.prototype.showHeadlines = function(doc = document) {
    var htmlString = "<ul>"
    console.log(this.newsDataObjArray);
    var array = this.newsDataObjArray;
    for (var i = 0; i <array.length; i++){
      htmlString += ("<li><div><a href='#news/" + i + "'>" + array[i].webTitle + "</div></li>");
     };
    htmlString += "</ul>";
    doc.getElementById('news').innerHTML = htmlString;
  };

  Page.prototype.listenForHashChanges = function(){
    var that = this;
    window.addEventListener("hashchange", function(){that.getSummaryFromApi();});
  };

  Page.prototype.getSummaryFromApi = function(doc = document) {
    var newsId = this._getNewsIdFromUrl(doc.location);
    var newsUrl = this.newsDataObjArray[newsId].webUrl;
    var apiUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + newsUrl;
    var that = this;
    var ourRequest2 = new XMLHttpRequest();
    ourRequest2.open('GET', apiUrl);
    ourRequest2.onload = function() {
      var ourData = JSON.parse(ourRequest2.responseText);
      that.currentSummarySentencesArray = ourData.sentences;
      that.showArticleSummary();
    };
    ourRequest2.send();
  };
    // var AYLIENTextAPI = require('aylien_textapi');
    // var textapi = new AYLIENTextAPI({
    //   application_id: "7ab590cd",
    //   application_key: "04144cb9bb6d4e1bcc5a2dfe205e95e6"
    // });
    // textapi.summarize({
    //   url: newsUrl,
    //   sentences_number: 3
    // }, function(error, response) {
    //   if (error === null) {
    //     response.sentences.forEach(function(s) {
    //       console.log(s);
    //     });
    //   }
    // });


  Page.prototype._getNewsIdFromUrl = function(location) {
    return parseInt(location.hash.split("#")[1].substring(5));
  };

  Page.prototype.showArticleSummary = function(doc = document){
    var newsId = this._getNewsIdFromUrl(doc.location);
    var newsTitle = this.newsDataObjArray[newsId].webTitle;
    var htmlString = "<h1>" + newsTitle + "</h1><ul>"
    var array = this.currentSummarySentencesArray;
    for (var i = 0; i <array.length; i++){
      htmlString += " " + array[i];
     };
    htmlString += "</ul><br><br><a href='#news/" + parseInt(newsId) + "/full-article'>Full Article</a>"
    doc.getElementById('news').innerHTML = htmlString;
  };

  exports.Page = Page;
})(this);
