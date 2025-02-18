import videos from "./videos.js"; // Certifique-se de que a importação está correta

function loadVideos() {
    const playlist_area = document.querySelector(".playlist");

    if (!playlist_area) { 
        console.error("Erro: Elemento .playlist não encontrado!");
        return;
    }

    videos.forEach((video, index) => {
        const div = document.createElement("div");

        div.innerHTML = `
            <div class="playlist-video ${index === 0 ? "active" : ""}">
                <video src="${video.src}" muted></video>
                <label class="playlist-video-info">${video.title}</label>
            </div>
        `;

        playlist_area.appendChild(div);
    });

    addOnClick();
}

function addOnClick() {
    const video_main = document.querySelector(".main-video-content video");
    const video_info = document.querySelector(".main-info");
    const playlist_videos = document.querySelectorAll(".playlist-video");

    playlist_videos.forEach((item, i) => {
        if (i === 0) {
            setVideo(video_main, video_info, item);
        }

        item.onclick = () => {
            playlist_videos.forEach((video) => video.classList.remove("active"));
            item.classList.add("active");

            setVideo(video_main, video_info, item);
        };
    });
}

function setVideo(video_main, video_info, item) {
    video_main.src = item.querySelector("video").getAttribute("src");
    video_info.innerHTML = item.querySelector(".playlist-video-info").innerHTML;
}

document.addEventListener("DOMContentLoaded", loadVideos);
