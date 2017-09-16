
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
    var page = new Page(documentDouble);
    setTimeout(function(){
      var string = "<ul><li><div>Is technology delivering in schools? Our panel debates</div></li>"
        + "<li><div>Theresa May rules out participating in TV debates before election</div></li>"
        + "<li><div>Scottish parliament debates call for second independence referendum - Politics live</div></li>"
        + "<li><div>The Snap: the best-worst reasons to miss the TV leaders' debates</div></li>"
        + "<li><div>David Squires on … the Tory manifesto, leaders' debates and hot takes on poverty</div></li>"
        + "<li><div>No dissent, no risks, no TV debates: May’s election stall offers only cynicism | Alex Salmond</div></li>"
        + "<li><div>May 'open to other options' after ruling out head-to-head television debates</div></li>"
        + "<li><div>Chickening out of TV debates is shameful. Why is May avoiding us? | Caroline Lucas</div></li>"
        + "<li><div>The Nixon-Kennedy presidential debates: from the archive, 1960</div></li>"
        + "<li><div>Theresa May accused at PMQs of running scared from TV debates</div></li></ul>";
      pass = documentDouble.getElementById("news").innerHTML === string;
      assert.isTrue(pass);
      formatOutput('testPageLoadsHeadlines', pass)
    }, 3000);
  };
  testPageLoadsHeadlines();


})(this);
