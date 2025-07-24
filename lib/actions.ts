"use server"

import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write"
import slugify from "slugify"

export const createPitch = async (state:any,form:FormData,pitch:string) =>{
    const session=await auth()
    if(!session){
        return {status:"ERROR",error:"You must be logged in to create a pitch"}
    }
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key])=>key !=='pitch')
    );
    const slug=slugify(title as string,{lower:true,strict:true})
    try {
        const startup={
            title,
            description,
            category,
            image:link,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:"reference",
                _ref:session?.id
            },
            pitch,
        }
        const result=await writeClient.create({
            _type:"startup",
            ...startup
        })
        return JSON.stringify({
           ...result,
           error:"",
           status:"SUCCESS",
        })

    }
    catch (error){
        console.log(error)
        return {status:"ERROR",error:"An unexpected error has occurred"}

    }

}