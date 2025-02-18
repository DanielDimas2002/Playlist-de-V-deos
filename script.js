// Importa a lista de vídeos do arquivo 'videos.js'
import videos from "./videos.js"; 

// Função para carregar os vídeos na playlist
function loadVideos() {
    // Seleciona a área da playlist no HTML
    const playlist_area = document.querySelector(".playlist");

    // Verifica se a área da playlist foi encontrada, caso contrário, exibe um erro e retorna
    if (!playlist_area) { 
        console.error("Erro: Elemento .playlist não encontrado!");
        return;
    }

    // Para cada vídeo na lista de vídeos, cria um item na playlist
    videos.forEach((video, index) => {
        // Cria um elemento <div> para o vídeo da playlist
        const div = document.createElement("div");

        // Define o conteúdo da <div>, com o vídeo e o título
        div.innerHTML = `
            <div class="playlist-video ${index === 0 ? "active" : ""}">
                <video src="${video.src}" muted></video>
                <label class="playlist-video-info">${video.title}</label>
            </div>
        `;

        // Adiciona o novo item da playlist à área da playlist
        playlist_area.appendChild(div);
    });

    // Chama a função que adiciona o evento de clique aos itens da playlist
    addOnClick();
}

// Função que adiciona o comportamento de clique na playlist
function addOnClick() {
    // Seleciona o vídeo principal que será exibido
    const video_main = document.querySelector(".main-video-content video");

    // Seleciona a área onde o título do vídeo principal será exibido
    const video_info = document.querySelector(".main-info");

    // Seleciona todos os itens da playlist
    const playlist_videos = document.querySelectorAll(".playlist-video");

    // Para cada item da playlist, adiciona o evento de clique
    playlist_videos.forEach((item, i) => {
        // Se for o primeiro vídeo, já carrega ele no vídeo principal
        if (i === 0) {
            setVideo(video_main, video_info, item);
        }

        // Adiciona o evento de clique no item da playlist
        item.onclick = () => {
            // Remove a classe 'active' de todos os itens da playlist
            playlist_videos.forEach((video) => video.classList.remove("active"));
            // Adiciona a classe 'active' ao item clicado
            item.classList.add("active");

            // Chama a função para atualizar o vídeo principal com o vídeo clicado
            setVideo(video_main, video_info, item);
        };
    });
}

// Função para atualizar o vídeo principal e o título com o vídeo clicado
function setVideo(video_main, video_info, item) {
    // Atualiza o src do vídeo principal com o vídeo da playlist
    video_main.src = item.querySelector("video").getAttribute("src");
    
    // Atualiza o título do vídeo principal com o título do vídeo da playlist
    video_info.innerHTML = item.querySelector(".playlist-video-info").innerHTML;
}

// Quando o conteúdo do DOM for totalmente carregado, chama a função loadVideos para carregar os vídeos na playlist
document.addEventListener("DOMContentLoaded", loadVideos);
