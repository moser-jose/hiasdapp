import { HymnsTypes } from "@/types/hymnsTypes";

export const ListHymnsFilter=(query:string)=>(hymn:HymnsTypes['hymn'])=>
    hymn.title?.toLowerCase().includes(query.toLowerCase()) || 
    hymn.numero?.toString().includes(query) 
    //hymn.estrofes?.some((item:{estrofe:string}) => item.estrofe.toLowerCase().match(query.toLowerCase()));