import cors from "cors"
import express, { request, response } from "express"

import { convert } from "./convert.js"
import { download } from "./download.js";
import { transcribe } from "./transcribe.js";
import { summaryze } from "./summarize.js"

const app = express();
app.use(express.json());
app.use(cors());

app.get("/summary/:id", async (request, response) => {
    
    try {
        await download(request.params.id)
        const audioConverted = await convert();

        const res = await transcribe(audioConverted)
        return response.json({ res });

    } catch (error) {
        console.log(error);
        return response.json({error})
    }

})

app.post("/summary", async (request, response) => {
    try {
    const res = await summaryze(request.body.text)
    return response.json({ res });
    
    }catch (error) {
        console.log(error);
        return response.json({error})
    }
})

app.listen(3333, () => {
    
})
