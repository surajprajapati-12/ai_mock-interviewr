import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore"; // If using Firebase
import { db } from "@/config/firebase.config";
import { FormMockInterview } from "@/components/form-mock-interview"; // ✅ Correct for named export


interface Interview {
  id: string;
  position: string;
  description: string;
  experience: number;
  userID: string;
  techStack: string;
  question: { question: string; answer: string }[];
  createdAt: Timestamp;
  updatedAt: Timestamp; 
}

function CreateEditPage() {
  // Extract interviewID from URL params
  const { interviewId } = useParams(); // No need for generic type here

  // State to hold interview details, initially set to null
  const [interview, setInterview] = useState<Interview | null>(null);
//fetching interview details from firestore
  useEffect(()=>{
    const fetchInterview=async()=>{
        if(interviewId){
            try{
                const interviewDoc=await getDoc(doc(db,"interview",interviewID));
                if(interviewDoc.exists()){
                    setInterview({...interviewDoc.data()} as Interview);
                }
            }catch(error){
                console.log(error);
            }
        }
    };
    fetchInterview();
  },[interviewId])

  return <div className="flex-col w-full my-4">
        <FormMockInterview initialData={interview}/>
    </div>;
}

export default CreateEditPage;
