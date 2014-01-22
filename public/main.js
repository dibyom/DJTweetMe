var trackName = new Array();
    var trackID = new Array();
    var trackVote = new Array();
    var trackLen = new Array();
    var topFive = new Array(5);
    var tweetID = 0;
    var len =0;
    first = true;

    i=0;
    while(i<5000){
      trackVote[i]=0;
      i++;
    }
    hold = true;
    function getData(callback){
      var id;
      dupe=true;
      $.getJSON('http://djtweetme.herokuapp.com/tweets/'+tweetID,
      function(tdata) {
        
        if (tdata.length != 0)
          {
          if(tdata.length > 20 && first == true){
            high = tdata.length;
            console.log(high);
            q = high - 20;
            first = false;
          }
          else{
            high = tdata.length;
            q=0;
          }
          while(q<high){
            dupe=true;
            $.getJSON('http://djtweetme.herokuapp.com/search/' + parseTweet(tdata[q].text),
            function(rdata) {
              if (rdata.length != 0)
              {
              //DATA
              var added = false;
              i=0;
              while (i<trackID.length)
              {
                if(rdata[0].key==trackID[i])
                { //the ID key is a duplicate of one in the database
                  trackVote[i]++;
                  added = true;
                }
                i++;
              }
              if(added == false)
              {
               trackID[i]=rdata[0].key;
               trackName[i]=rdata[0].name;
               trackVote[i]++;
               trackLen[i]=rdata[0].duration;
             }
            }
            });
            q++;
          }
        tweetID=tdata[q-1].id;
        }       
      });
      updateTopFive(function() {
        callback();
      });
    }

    function parseTweet(var1){
      var parse = var1.toLowerCase();
      var parsed = parse.split("@djtweetme ").pop();
      var parsed = parsed.split('.').join("");
      var Parsed = parsed.split(',').join("");
      var parsed = parsed.split("#",1);
      return parsed;
    }

    callback_object.positionChanged = function positionChanged(position) {
      if(position>len-2){
        playSong();
      }
    }

    function update(){
        var timeout = 3000;
        var action = function() {
            getData();
        };
        setInterval(action, timeout);
      }


    function nextSong(){
      playSong();
    }

    function main(){
      playSong();
    }

      function resetSong(arrayPos){
      trackVote[arrayPos]=0;
    }

    function loader(){
      update();
    }

    function pauseSong(){
      apiswf.rdio_pause();
    }

    function resumeSong(){
      apiswf.rdio_play();
    }

    function playSong(){
      apiswf.rdio_play(trackID[topFive[0]]);
      len = trackLen[topFive[0]];
      resetSong(topFive[0]);
    }

    function updateTopFive(){
        var i =0;
        var high = -1;
        var store;
      while (i < trackID.length)
      {
        if (trackVote[i] > high)
        {
          high = trackVote[i];
          store = i;
        }
        i++;
      }
      topFive[0] = store;
      high = -1;
      i=0;
      while (i<trackID.length)
      {
        if(trackName[i] != trackName[topFive[0]])
        {
          if(trackVote[i] > high)
          {
            high = trackVote[i];
            store = i;
          }
        }
        i++;
      }
      topFive[1] = store;
      high = -1;
      i = 0;
      while (i<trackID.length)
      {
        if(trackName[i] != trackName[topFive[0]] && trackName[i] != trackName[topFive[1]])
        {
          if(trackVote[i] > high)
          {
            high = trackVote[i];
            store = i;
          }
        }
        i++;
      }
      topFive[2] = store;
      high = -1;
      i = 0;
      while (i<trackID.length)
      {
        if(trackName[i] != trackName[topFive[0]] && trackName[i] != trackName[topFive[1]] && trackName[i] != trackName[topFive[2]])
        {
          if(trackVote[i] > high)
          {
            high = trackVote[i];
            store = i;
          }
        }
        i++;
      }
      topFive[3] = store;
      high = -1;
      i = 0;
      while (i<trackID.length)
      {
        if(trackName[i] != trackName[topFive[0]] && trackName[i] != trackName[topFive[1]] && trackName[i] != trackName[topFive[2]] && trackName[i] != trackName[topFive[3]])
        {
          if(trackVote[i] > high)
          {
            high = trackVote[i];
            store = i;
          }
        }
        i++;
      }
      topFive[4] = store;
      document.getElementById("first").innerHTML = trackName[topFive[0]];
      document.getElementById("first-vote").innerHTML = trackVote[topFive[0]];
      document.getElementById("second").innerHTML = trackName[topFive[1]];
      document.getElementById("second-vote").innerHTML = trackVote[topFive[1]];
      document.getElementById("third").innerHTML = trackName[topFive[2]];
      document.getElementById("third-vote").innerHTML = trackVote[topFive[2]];
      document.getElementById("fourth").innerHTML = trackName[topFive[3]];
      document.getElementById("fourth-vote").innerHTML = trackVote[topFive[3]];
      document.getElementById("fifth").innerHTML = trackName[topFive[4]];
      document.getElementById("fifth-vote").innerHTML = trackVote[topFive[4]];

    }


