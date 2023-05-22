const { config } = require('dotenv');

let menuIconEl = document.querySelector(".menu-icon");
let sidebarEl = document.querySelector(".sidebar");
let containerEl = document.querySelector(".container");
const videoCardContainerEl = document.querySelector(".list-container")
const dotenv = require('dotenv').config();


// let api_key = process.env.MY_API_TOKEN;
let api_key = "AIzaSyDI2ZTMxh12ZkL9Z51ZY42cMUTrPu2GvXk";
video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";


menuIconEl.onclick = function(){
    sidebarEl.classList.toggle("small-sidebar");
    containerEl.classList.toggle("large-container")
};


fetch (video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    // console.log(data);
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part:'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainerEl.innerHTML += `
    <div class="vid-list">
                <a href="https://youtube.com/watch/?v=${data.id}"><img src="${data.snippet.thumbnails.high.url}" class="thumbnail" /></a>
                <div class="flex-div">
                    <img src="${data.channelThumbnail}" />
                    <div class="vid-info">
                        <a href="play-vid.html">
                            ${data.snippet.title}
                        </a>
                        <p>
                            ${data.snippet.channelTitle}
                        </p>
                        <p>
                            15k Views &bull; 2 days
                        </p>
                    </div>
                </div>
            </div>
    `
}


//  Search Bar

const searchInputEl = document.querySelector(".search-bar");
const searchBtnEl = document.querySelector(".search-btn");
let searchLink = "https://www.youtube.com/results?search_query=";


searchBtnEl.addEventListener('click',() =>{
    if(searchInputEl.value.length){
            searchBtnEl.href = searchLink + searchInputEl.value;
    }
})
