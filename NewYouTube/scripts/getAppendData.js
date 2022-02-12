let videosDiv = document.querySelector("#videos");

document.querySelector("#searchVideo").addEventListener("click", showVideos);

async function showVideos(){
    let resultVideo = document.querySelector("#inputVideo").value;
    if (resultVideo === ""){
        resultVideo = JSON.parse(localStorage.getItem("SearchVideo"));
        resultVideo = resultVideo;
    }
    else{
        localStorage.removeItem("SearchVideo");
        localStorage.setItem("SearchVideo", JSON.stringify(resultVideo));
    }
    document.title = resultVideo + " - YouTube";
    let api = `AIzaSyCVcShZKV5q8yJrH0QwBwwCwEYuCITFN34`;
    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${resultVideo}&type=video&key=${api}&maxResults=40`;
     try{
        let res = await fetch(url);
        let videos = await res.json();
        videos = videos.items;
        console.log(videos);
        appendVideos(videos);
    }
    catch(e){
        console.log("error: ", e);
    }
}
showVideos();
function appendVideos(videos){
    videosDiv.innerHTML = null;
    videos.forEach(({ snippet, id:{ videoId } }) => {
        let div = document.createElement('div');

        let thumbnail = document.createElement('img');
        thumbnail.src = snippet.thumbnails.medium.url;
        let div1 = document.createElement('div');
        let videoTitle = document.createElement('p');
        videoTitle.innerText = snippet.title;

        let dataToSend = {
            snippet,
            videoId
        }

        div.onclick = () =>{
            showVideo(dataToSend);
        }
        div1.append(videoTitle);
        div.append(thumbnail, div1);
        videosDiv.append(div); 
    });
}

function showVideo(data){
    localStorage.removeItem("clickedVideo");
    localStorage.setItem("clickedVideo", JSON.stringify(data));
    window.location.href = `playVideo.html`;
}