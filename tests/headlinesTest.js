
(function(exports) {

  function testPageLoadsHeadlines() {
    function DocumentDouble() {
      this.tags = {};
    }
    function Tag(){
      this.innerHTML = ""
    }
    DocumentDouble.prototype.getElementById = function (id) {
      if (!(id in this.tags)) {
        this.tags[id] = new Tag();
      };
      return this.tags[id];
    };
    var documentDouble = new DocumentDouble()
    var page = new Page();
    var guardianApiDouble = "file:///Users/jenniferbacon/Documents/Coding/Makers/week11/news-summary-challenge/tests/mock-guardian-api.json"
    page.getNewsFromApi( guardianApiDouble ,documentDouble);
    setTimeout(function(){
      var string = "<ul><li><div>Is technology delivering in schools? Our panel debates</div></li>"
        + "<li><div>Theresa May rules out participating in TV debates before election</div></li>";
      pass = documentDouble.getElementById("news").innerHTML === string;
      console.log(string);
      console.log(documentDouble.getElementById("news").innerHTML);
      assert.isTrue(pass);
      formatOutput('testPageLoadsHeadlines', pass)
    }, 3000);
  };
  testPageLoadsHeadlines();


})(this);
