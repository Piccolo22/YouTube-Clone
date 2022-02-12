async function getData(url){
    try{
        let res = await fetch(url);
        let data = await res.json();
        return data;
    }
    catch(e){
        console.log("error : ", e);
    }
}

function appendDataGrid(data, location){
    data.forEach(({ snippet, id:{ videoId } }) => {
        let div = document.createElement('div');

        let thumbnail = document.createElement('img');
        thumbnail.src = snippet.thumbnails.medium.url;
        let div1 = document.createElement('div');
        let videoTitle = document.createElement('p');
        videoTitle.setAttribute("id", "title");
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
        location.append(div); 
    });
}

function showVideo(data){
    localStorage.removeItem("clickedVideo");
    localStorage.setItem("clickedVideo", JSON.stringify(data));
    window.location.href = `playVideo.html`;
}

export { getData, appendDataGrid };