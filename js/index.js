var twitchChannels = ["meclipse", "ninja", "freecodecamp", "MedryBW", "grimmmz", 'blizzheroes',
  'ronimogames',
  'callofduty',
  'aimilita_sou',
  'towelliee',
  'spb_89',
  'hydramist',
  'followgrubby',
  'miramisu',
  'loserfruit',
  'timthetatman',
  'nl_kripp',
  'kimberlythegeek',
  'comster404',
  'brunofin'];

var baseUrl = "https://wind-bow.glitch.me/twitch-api/streams/";


$(document).ready(function () {
  clear();
  $.each(twitchChannels, function (index, val) {
    getStatus(val);
  });

});

function getStatus(channelName) {

  // Using JSONP
  $.ajax({
    url: baseUrl + channelName,

    // The name of the callback parameter
    jsonp: "callback=?",

    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",

    // Work with the response
    success: function (data) {


      if (data.stream == null) {

       var cardDeck_start = '<div class="col-sm-6 col-md-4 col-lg-3">';
        var card_start = '<div class="card border-danger offline mb-4">';
        var image_logo = '<div class="center pt-2"><img class="logo" src="https://dummyimage.com/300x300/e0e0e0/000000&text=Offline" alt="Logo"></div>';

        var card_body ='<div class="card-body card-body-width"><h5 class="card-title">'+ channelName +'</h5><h6 class="card-subtitle mb-2 text-muted"></h6></div><small class="text-muted"><i class="fa fa-eye-slash"></i></small><hr>';

        var card_footer = '<div class="card-footer"><a href="https://www.twitch.tv/'+ channelName +'"  target="_blank"><span class="badge badge-pill badge-danger">Offline</span></div>';
        var card_end = "</div>";
        var cardDeck_end = "</div>";
       
        var renderOffline = cardDeck_start+ card_start+image_logo+card_body+card_footer+card_end +cardDeck_end;

        $(".display").append(renderOffline);

         
      }
      
      
      else if (data.stream == undefined) {

      }
      else {

       

        var name = data.stream.channel.name;
        var logo = data.stream.channel.logo;
        var url = data.stream.channel.url;
        var game = data.stream.channel.game;


        var cardDeck_start = '<div class="col-sm-6 col-md-4 col-lg-3">';
        var card_start = '<div class="card border-success online mb-4">';
        var image_logo = '<div class="center pt-2"><img class="logo" src='+ logo +' alt="Logo"></div>';
        var card_body ='<div class="card-body card-body-width"><h5 class="card-title">'+ name +'</h5><h6 class="card-subtitle mb-2 text-muted">'+'<i class="fa fa-gamepad"></i> ' +  game+'</h6></div><small class="text-muted"><i class="fa fa-eye"></i> '+data.stream.channel.views + '</small><hr>';
       
        var card_footer = '<div class="card-footer"><a href='+url+' target="_blank"><span class="badge badge-pill badge-success">Online</span></a></div>';
        var card_end = "</div>";
        var cardDeck_end = "</div>";


        var renderOnline = cardDeck_start + card_start+image_logo+card_body+card_footer+card_end +cardDeck_end;

        $(".display").prepend(renderOnline);
      }

    }
  });
}

function clear() {
  $('.display').empty();
}



$('#all').on('click', function () {

  $('.online').show(500);
  $('.offline').show(500);
});

$('#online').on('click', function () {

  $('.offline').hide(500);
  $('.online').show(500);

});


$('#offline').on('click', function () {
  $('.online').hide(500);
  $('.offline').show(500);
});