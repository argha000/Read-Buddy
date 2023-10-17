// lots of stuff to do 


import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'

import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { getPineconeClient } from '@/lib/pinecone'

const f = createUploadthing();



export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const { getUser } = getKindeServerSession()
            const user = getUser()

            if (!user || !user.id) throw new Error('Unauthorized')

            return { userId: user.id }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const createdFile = await db.file.create({
                data: {
                    key: file.key,
                    name: file.name,
                    userId: metadata.userId,
                    url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
                    uploadStatus: 'PROCESSING',
                }
            })
            try {
                const response = await fetch(
                    `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
                )
                const blob = await response.blob()

                const loader = new PDFLoader(blob)

                const pageLevelDocs = await loader.load()

                const pagesAmt = pageLevelDocs.length //this will be used for checking the membership

                //insert the subscription details.....


                // put the page info the ai for analization using vectrozitation....and index the entire documents

                const pinecone = await getPineconeClient()
                const pineconeIndex = pinecone.Index("readbuddy")//my index name

                const embeddings = new OpenAIEmbeddings({
                    openAIApiKey: process.env.OPENAI_API_KEY,
                })

                await PineconeStore.fromDocuments(
                    pageLevelDocs,
                    embeddings,
                    {//this can give error.............. 
                        pineconeIndex,
                        namespace: createdFile.id,
                    }
                )

                await db.file.update({
                    data: {
                        uploadStatus: 'SUCCESS',
                    },
                    where: {
                        id: createdFile.id,
                    },
                })

            } catch (err) {
                await db.file.update({
                    data: {
                        uploadStatus: 'FAILED',
                    },
                    where: {
                        id: createdFile.id,
                    },
                })
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 