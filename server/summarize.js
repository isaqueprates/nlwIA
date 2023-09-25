import { pipeline } from "@xenova/transformers";

import { summaryExample } from "./utils/summary.js";

export async function summaryze(text){
    try {
        //return summaryExample;
        const generator = await pipeline("summarization","Xenova/distilbart-cnn-12-6")

        const output = await generator(text)

        console.log('Resumo concluido')
        return output[0].summary_text;

    } catch (error) {
        console.log('Não foi possivel realizar o resumo', error)
        throw new Error(error);
    }
}