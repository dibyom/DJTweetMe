var trackName = new Array();
    var trackID = new Array();
    var trackVote = new Array();
    var trackLen = new Array();
    var topFive = new Array(5);
    var tweetID = 0;

    i=0;
    while(i<5000){
      trackVote[i]=0;
      i++;
    }

    function getData(){
      var id;
      dupe=true;
      $.getJSON('http://dj-tweet.herokuapp.com/tweets/'+tweetID,
      function(tdata) {
        
        if (tdata.length != 0)
        {
          q=0;
        while(q<tdata.length){
          dupe=true;
          $.getJSON('http://dj-tweet.herokuapp.com/search/' + parseTweet(tdata[q].text),
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
    }

    function delayStart(){
      
      setTimeout(function() { playSong();}, 3500);
      setTimeout(function() { updateTopFive();}, 3000);
      getData();
    }

    function parseTweet(var1){
      var parsed = var1.split("@MhacksDJTweet ").pop();
      var parsed = parsed.split('.').join("");
      var Parsed = parsed.split(',').join("");
      var parsed = parsed.split("#play",1);
      return parsed;
    }

    callback_object.positionChanged = function positionChanged(position) {
      if(position>len-2){
        playSong();
      }
      
    }

    callback_object.playStateChanged = function playStateChanged(playState) {
      if(playState !=1 ){
        playSong();
      }
    }

    function update(){
      
      var timeout = 200;
      var action = function() {
          updateTopFive();
          getData();
      };
      setInterval(action, timeout);

    }

    function nextSong(){
      playSong();
    }

    function playSong(){
      apiswf.rdio_play(trackID[topFive[0]]);
      len = trackLen[topFive[0]];
      resetSong(topFive[0]);
    }

    function main(){
      playSong();
    }
  

    function updateTopFive(playingTrack){
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

    function resetSong(arrayPos){
      trackVote[arrayPos]=0;
    }

    function loader(){
      setTimeout(function() { update();}, 2000);
      setTimeout(function() { updateTopFive();}, 1000);
      getData();
    }

    function pauseSong(playState){
      apiswf.rdio_pause();
    }

    function resumeSong(){
      apiswf.rdio_play();
    }
     callback_object.playStateChanged = function playStateChanged(playState) {
    // The playback state has changed.
    // The state can be: 0 - paused, 1 - playing, 2 - stopped, 3 - buffering or 4 - paused.
    $('#playState').text(playState);
    }