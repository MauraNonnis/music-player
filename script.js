let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let slider = document.querySelector('#duration_slider');
let track_image = document.querySelector('#track_image');
let artist = document.querySelector('#artist');
let image = document.getElementById("track_image")
let timer;
let autoplay = 0;
let index_no = 0;
let playingSong = false;
let track = document.createElement('audio');


let allSongs = [
   {
     name: "Concerto no. 21",
     path: "music/Andante.mp3",
     img: "pics/mozart.jpg",
     singer: "W.A. Mozart"
   },
   {
     name: "Spring",
     path: "music/Spring.mp3",
     img: "pics/vivaldi.jpg",
     singer: "Antonio Vivaldi"
   },
   {
     name: "Concerto no. 3",
     path: "music/Concerto-no-3.mp3",
     img: "pics/bach.jpg",
     singer: "Sebastian Bach"
   },
   {
     name: "Symphony no. 40",
     path: "music/Symphony no. 40.mp3",
     img: "pics/mozart.jpg",
     singer: "W.A. Mozart"
   }
];




function load_track(index_no){
	clearInterval(timer);
	reset_slider();
	track.src = allSongs[index_no].path;
	title.innerHTML = allSongs[index_no].name;	
	track_image.src = allSongs[index_no].img;
    	artist.innerHTML = allSongs[index_no].singer;
    	track.load();
	timer = setInterval(range_slider ,1000);
	
}

load_track(index_no);

function justplay(){
 	if(playingSong==false){
 		playsong();

 	}else{
 		pausesong();
 	}
}

function reset_slider(){
 	slider.value = 0
}


function playsong(){
  track.play();
  playingSong = true;
  play.innerHTML = '<i class="fas fa-pause"></i>';
}


function pausesong(){
	track.pause();
	playingSong = false;
	play.innerHTML = '<i class="fas fa-play"></i>';
}

function next_song(){
	if(index_no < allSongs.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}

function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = allSongs.length;
		load_track(index_no);
		playsong();
	}
}

 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

function range_slider(){
	let position = 0;
	if(!isNaN(track.duration)){
		position = track.currentTime * (100 / track.duration);
		slider.value =  position;
	}
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
       		}
       }
}
