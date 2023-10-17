//this page is complete

import { Pinecone } from '@pinecone-database/pinecone'

export const getPineconeClient = async () => {
    const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: 'us-west4-gcp-free',//this is my enviorment ,
    })

    return client
}