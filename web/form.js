import axios from "axios";
import { server } from "./server.js";

const form = document.querySelector('#form');
const input = document.querySelector('#url');
const resum = document.querySelector('#content');

form.addEventListener('submit',async (event) => {
    event.preventDefault();
    resum.classList.add("placeholder");

    const urlVideo = input.value;

    if(!urlVideo.includes("shorts")){
        
        return resum.textContent ='Isso não é um short'
    }

    const [_, params] = urlVideo.split('/shorts/');
    const [videoId] = params.split('?si')

    resum.textContent ='Obtendo o texto do áudio...';
    const description = await server.get("/summary/" + videoId)
    
    // .then(res => {
    //     resum.textContent = res.data.result;
    // }).catch( error => { 
    //     console.error(error)
    // })

    resum.textContent = 'Realizando o resumo'

    const summary = await server.post("summary", { text: description.data.res })

    resum.textContent = summary.data.res
    resum.classList.remove("placeholder");
})
