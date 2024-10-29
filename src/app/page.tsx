"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderForPage from "@/components/loader-for-pages/laoder-for-page";
export default function Home() {
   const router = useRouter();

   useEffect(()=>{
       router.push('/calendario')
   },[])

   return (
      <LoaderForPage/>
   );
}
