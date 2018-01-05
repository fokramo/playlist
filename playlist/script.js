$(document).ready(function(){

	$('.playlistplayer').hide();
	$('.glysongs').hide();
  $('.saveAdding1').hide();

// adding playlist img 
	$('#imgname').keyup(function(){
      var a = $(this).val();
      var new_img = "<img class='playlistimg' src="+a+">";
      $('#playlistimg').html(new_img);
      $('#playlistimg').delay(5000);
    });

// resting the modal fields
    $('.rest').click(function(){
   		$('#playlistname').val('');
   		$('#imgname').val('');
   		$('#playlistimg').attr('src','');
    });

// cuse i have the same mdal for editing and adding new playlist i have to change the buttonsin the modal 
  $('.navbar-header').click(function(){
      	$('.saveEditplaylist').hide();
      	$('.saveAdding').show();
      	$('.rest').show();
      	$('.next').show();

      })

//  adding new field for song adding
    $('.add').click(function(){
    	$('.addSongInput').append('<div><label>Song URL:</label><input type="text" class="songurl"/><label>Name:</label><input type="text" class="songname"/></div>')
    }) 

// ajax returning all plalylist from dp creating new panel with playlist info
    $.ajax({
    	url:'./api/playlist',
    	success:function(data){
     		for (var i = 0; i < data.data.length; i++) {
    			$('#playlists').append(createpanel(data.data[i].name,data.data[i].image,data.data[i].id));
       		}
    	}
    })

// removing song from playlist  
    $(document).on('click','.removesong1',function(){
    	$(this).parent().remove();
    })
    
// simply suffle icone when clicked adding new class active1
    $('.random').click(function(){
    	if($(this).hasClass('active1')){
    		$(this).removeClass('active1');
    	}else{
    		$(this).addClass('active1');
    	}
    })

// after cheking that the inputs not empty saving the new playlist
    $('.saveAdding').on('click',function(){
        var invalid = $('#myForm2').find('input:invalid');
        if(invalid.length === 0 ){
            location.reload();
        	  var a = $('#imgname').val();
            var b = $('#playlistname').val();
            var arr = [];
            $('.songurl').each(function(){
            	if ($(this).val()!= '' && $(this).siblings('.songname').val()!=''){
            		arr.push({url:$(this).val(),name:$(this).siblings('.songname').val()});
                };
             }) 
           	$.ajax({
        		url:'./api/playlist',
        		type:'POST',
        		data:{
        			name:b,
        			image:a,
        			songs:arr
        		},success:function(data){
         			$('#playlists').append(createpanel(b,a,data.data.id));
          		}
        	})
        }
  })

// after cheking that the inputs not empty saving the edited playlist   
    $(document).on('click','.saveAdding1',function(){
        var invalid = $('#myForm2').find('input:invalid');
        if(invalid.length === 0 ){
            location.reload();
        var id = $('.playid').html();
        var arr = [];
        $('.songurl').each(function(){
        	if ($(this).val()!= '' && $(this).siblings('.songname').val()!=''){
        		arr.push({url:$(this).val(),name:$(this).siblings('.songname').val()});
            };
         }) 
       	$.ajax({
    		url:'./api/playlist/'+id+'/songs',
    		type:'POST',
    		data:{
    			songs:arr
    		},success:function(data){
       		}
    	})
       }
    })

// deleting playlist
     $(document).on('click','.remove',function(){
      	var id = $(this).closest("div").prop("id");
      	var thiss =$(this).closest("div.col-sm-3");
       	bootbox.confirm("Are you sure?", function(result){
      		if (result) {
      		   thiss.remove();
      	     	$.ajax({
      				url:'./api/playlist/'+id,
      				type:'delete',

      			})
      	 } })
      })

//editing the playlist info img and title
    $(document).on('click','.edit',function(){
      	var id = $(this).closest("div").prop("id");
      	$('.playid').html(id);
      	$('.rest').hide();
      	$('.next').hide();
      	$('.saveEditplaylist').css('display','initial');
      	var title= $(this).closest("div.panel").find('h3').html();
      	var src= $(this).closest('div.panel-body').find('img').prop("src");
      	$('#playlistname').val(title);
     		$('#imgname').val(src);
     		var new_img = "<img class='playlistimg' src="+src+">";
        $('#playlistimg').html(new_img);
        $('#playlistimg').delay(5000);
    })
// saving editing
    $('.saveEditplaylist').click(function(){
        var a = $('#imgname').val();
        var b = $('#playlistname').val();
    	  var id = $('.playid').html();
      	$.ajax({
      		type:'POST',
      		url:'./api/playlist/'+ id ,
      		data:{
      			name:b,
      			image:a
      		},success:function(data){
      			console.log(data)
      		}

      	})
      })
    var audio = $('#audio');

// playing clicked playlist 
     $(document).on('click','.play',function(){
      	$('source').remove() ;
       	$('.playlistplayer').animate( { "opacity": "show"} , 1000 );
      	$('.glysongs').animate( { "opacity": "show"} , 1000 );
      	var id = $(this).closest("div").prop("id");
       	$('.playid').html(id);
      	createSungList(id); 
        	$.ajax({
        		url:'./api/playlist/'+ id,
        		success:function(data){
        			$('title').html(data.data.name);
        			$('.playname').html(data.data.name);
        			$('.playlistplayerimg').html("<img class='playimg spin' src="+data.data.image+">");
        			$('.playlistplayerimg').append("<span class='glyphicon glyphicon-pause play3'></span>");
         		}
       	})
       	setTimeout(function(){return init()},150); 
        })

// play2 & play3 is the play pause butten inside rotating img
     $(document).on('click','.play3',function(){
       	$('.play3').remove();
       	$('.playimg').removeClass('spin');
      	$('.playlistplayerimg').append("<span class='glyphicon glyphicon-play-circle play2'></span>");
      	var audio = $('#audio');
        audio[0].pause();
     })  
     $(document).on('click','.play2',function(){
     	$('.play2').remove();
     	$('.playimg').addClass('spin');
      	$('.playlistplayerimg').append("<span class='glyphicon glyphicon-pause play3'></span>");
      	var audio = $('#audio');
        audio[0].play();
     })

// when pausing the audio the icone inside the rotating img change accordingly     
	   audio[0].addEventListener("pause", function () {
	      	$('.play3').remove();
	      	$('.play2').remove();
	      	$('.playimg').removeClass('spin');
      	   $('.playlistplayerimg').append("<span class='glyphicon glyphicon-play-circle play2'></span>");
   });
	    audio[0].addEventListener("play", function () {
	      	$('.play2').remove();
	      	$('.play3').remove();
     	    $('.playimg').addClass('spin');
      	    $('.playlistplayerimg').append("<span class='glyphicon glyphicon-pause play3'></span>");
   });

// save the playlist song list 
	    $('.editsong').click(function(){
  	    	$('.saveAdding1').show();
          $('.saveAdding').hide();
  	      $('.addSongInput').html('');
  	    	var playlist1 = $('#playlist li');
    	    for (var i = 0; i < playlist1.length; i++) {
  	    		$('.addSongInput').append("<div><label>Song URL:</label><input type='text' class='songurl' value='"+$(playlist1[i].innerHTML).attr('href')+"'/><label>Name:</label><input type='text' class='songname' value='"+playlist1[i].innerText+"'/><span class='glyphicon glyphicon-remove removesong1'></span><br></div>");
  	    	}
	    })

	    $('.close').click(function(){
	    	$('input').val('');
	    	$('.playlistimg').attr('src','');
	    })

    $(document).on('keyup','.searchPlaylist',function(){
         var x = $("#playlists").find('h3');
         var val = $.trim($(this).val());
         if (val.length > 1){
             var results=arr.filter(function(i){
              return i.indexOf(val)>-1;
              });
             for (var i = 0; i < x.length; i++) {
                if (! results.includes(x[i].innerHTML)) {
                  $(x[i].closest('div.col-sm-3')).hide();
                }else{
                  $(x[i].closest('div.col-sm-3')).show();
                } 
             }
          }else{
            for (var i = 0; i < x.length; i++) {
              $(x[i].closest('div.col-sm-3')).show();
            }

          }
     }) 
// creating the song list
    function createSungList(id){ 
      	$.ajax({
    		url:'./api/playlist/'+id+'/songs',
    		success:function(data){
    			audio.attr('src',data.data.songs[0].url);
    			$('#playlist').html("<span class='titlePlaylist' style='margin-left: 70px;font-size: 20px;'>"+data.data.songs[0].name+"</span>");	
     			for (var i = 0; i < data.data.songs.length; i++) {
            if (i == 0 ) {
              $('#playlist').append("<li class='active'><a href='"+data.data.songs[i].url+"'>"+data.data.songs[i].name+"</a></li>")
              $('#audio').append("<source type='audio/mp3'  src='"+data.data.songs[i].url+"'>")
            }else{
    		    	$('#playlist').append("<li><a href='"+data.data.songs[i].url+"'>"+data.data.songs[i].name+"</a></li>")
    				  $('#audio').append("<source type='audio/mp3'  src='"+data.data.songs[i].url+"'>")
    			}
        }
    		}
    	})
    }

    var arr = [];
// creating the panel that include the plalist info with the arc shaped title
    function createpanel(title,imagesrc,dataid){   
    	 arr.push(title);
         txt = title.split("")
         str=``;
		 var deg = 180 / txt.length,
		    origin = -88;
		  txt.forEach((ea) => {
		    ea = "<p style='height:100px;position:absolute;transform:rotate("+origin+"deg);transform-origin:0 100%'>"+ea+"</p>";
		    str += ea;
		    origin += deg;
		  });
		    return `<div class="col-sm-3">
					<div class="panel panel1">
						<div class="panelheading">`+str+`
 						</div>
 						<h3 style="display: none;">`+title+`</h3>
						<div class="panel-body">
						    <img class = 'playlistimg2' src='`+imagesrc+`'/>
						  <div class="gly" id = '`+dataid+`'>
						    <span class='glyphicon glyphicon-pencil edit' data-toggle="modal" data-target="#myModal" data-backdrop="static" data-dismiss="modal"></span>
						    <span class='glyphicon glyphicon-remove remove'></span>
						    <span class='glyphicon glyphicon-play-circle play'></span></div>
						</div>
					</div>
				</div> `
    }

// the main function thar control which song to play (if clicked or the song ended)
   function init(){
   		var current = 0;
   		var playlist = $('#playlist');
   		var tracks = playlist.find('li');
   		var len = tracks.length;
   		audio[0].volume = .50 ;
      audio[0].load();
      audio[0].play();
	    playlist.on('click','a', function(event){
    			$('.play2').remove();
    			$('.play3').remove();
          $('.playlistplayerimg').append("<span class='glyphicon glyphicon-pause play3'></span>");
    			event.preventDefault();
    			link = $(this);
          $(link).parent().addClass('active');
    			current = link.parent().index()-1;
    			run(link, audio[0]);
  		});
  		audio[0].addEventListener('ended',function(){
  			if ($('.random').hasClass('active1')) {
  				current = Math.floor((Math.random() * len));
  				link = playlist.find('a')[current];
   			}else{
  			current++;
   			if(current == len){
  				current = 0;
  				link = playlist.find('a')[0];
  			}else{
  				link = playlist.find('a')[current];  
   			}
   		}
   			run($(link),audio[0]);
  	  });
	}

// loding and playing selected song & changing the browser title accordingly  
	function run(link, player){
 		  $('title').html($('.playname').html()+"-"+link[0].innerHTML);
  		$('.titlePlaylist').html(link[0].innerHTML);
 		  player.setAttribute('src', link.attr('href'));
 			par = link.parent();
			par.addClass('active').siblings().removeClass('active');
			player.load();
			player.play();
	}


  $("form").submit(function(e){
      e.preventDefault();
    });

  $('.next').on('click',function(){
    var invalid = $('#myForm').find('input:invalid');
    if(invalid.length === 0 ){
      $('#myModal').modal('hide');
       $('#myModal2').modal();
  }
  })
});