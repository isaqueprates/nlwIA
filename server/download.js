import ytdl from 'ytdl-core';
import fs from 'fs';

export const download = (idVideo) => new Promise((resolve, reject) => {
    const url = 'https://www.youtube.com/shorts/'+ idVideo;

    ytdl(url, { quality:"lowestaudio", filter:"audioonly"}).on('info',(info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        
        if(seconds > 60){
            // throw new Error("A duração desse vídeo é maior do que 60 segundos.")
            // throw new Error('Isso não é um short')
        }
    }).on("end", () => {
        console.log("final do download");
        resolve()
        
    }).on("error", (error) => {
        console.log("Erro ao fazer o download: ", error);
        reject(error)

    }).pipe(fs.createWriteStream("./temp/audio.mp4"))
})