(function(exports) {
  function Page (doc = document){
    var newsDataObjArray;
    var that = this;
    var ourRequest = new XMLHttpRequest();
    // https://content.guardianapis.com/search?api-key=3e8ee72b-5cd3-4951-9e66-d32ada386a74
    ourRequest.open('GET', 'https://content.guardianapis.com/search?q=debates&api-key=test')
    ourRequest.onload = function() {
      var ourData = JSON.parse(ourRequest.responseText);
      newsDataObjArray = ourData.response.results;
      that.newsDataObjArray = newsDataObjArray;
      // console.log(that);
      // console.log(that.newsDataObjArray)
      that.showHeadlines(doc);
    };
    ourRequest.send();
  };

  Page.prototype.showHeadlines = function(doc) {
    var htmlString = "<ul>"
      this.newsDataObjArray.forEach( function(newsDataObj){
        // <a href='#news/0'>
        htmlString += ("<li><div>" + newsDataObj.webTitle + "</div></li>");
      });
      htmlString += "</ul>"
      // console.log(htmlString);
      doc.getElementById('news').innerHTML = htmlString;
  };

  exports.Page = Page;
})(this);
