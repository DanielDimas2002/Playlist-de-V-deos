import videos from "./videos.js";

function loadVideos() {
    const playlist_area = document.querySelector(".playlist");

    videos.forEach((video, index) => {
        const div = document.createElement("div");
        div.classList.add("playlist-video");
        
        // Define a classe "active" no primeiro vídeo automaticamente
        if (index === 0) {
            div.classList.add("active");
        }

        div.innerHTML = `
            <video src="${video.src}" muted></video>
            <label class="playlist-video-info">${video.title}</label>
        `;

        playlist_area.appendChild(div);
    });

    addOnClick(); // Corrigindo nome da função
}

function addOnClick() {
    const video_main = document.querySelector(".main-video-content video"); // Pegando apenas o <video>
    const video_label = document.querySelector(".main-info"); // Pegando o <label>
    const playlist_videos = document.querySelectorAll(".playlist-video");

    playlist_videos.forEach((item, i) => {
        if (i === 0) {
            setVideo(video_main, video_label, item); // Define o primeiro vídeo como ativo
        }

        item.onclick = () => {
            playlist_videos.forEach(video => video.classList.remove("active"));
            item.classList.add("active");

            setVideo(video_main, video_label, item);
        };
    });
}

function setVideo(video_main, video_label, item) {
    video_main.src = item.children[0].getAttribute("src"); // Atualiza o vídeo principal
    video_label.innerHTML = item.children[1].innerHTML; // Atualiza o título abaixo do vídeo
}

loadVideos();
