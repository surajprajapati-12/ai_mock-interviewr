import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, Timestamp } from "firebase/firestore"; 
import { db } from "@/config/firebase.config";
import FormMockInterview from "@/components/form-mock-interview";

interface Interview {
  id: string;
  position: string;
  description: string;
  experience: number;
  userID: string;
  techStack: string;
  question: { question: string; answer: string }[]; // Questions aur answers ka array
  createdAt: Timestamp;
  updatedAt: Timestamp; 
}

function CreateEditPage() {
  // URL se interviewId nikal rahe hain
  const { interviewId } = useParams(); // Yahan generic type ki zarurat nahi hai

  // Interview ki details store karne ke liye state banayi hai, initial value null hai
  const [interview, setInterview] = useState<Interview | null>(null);

  // Firestore se interview details fetch karne ke liye useEffect ka use kar rahe hain
  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          // Interview ke document ko Firestore se fetch kar rahe hain
          const interviewDoc = await getDoc(doc(db, "interview", interviewId));
          if (interviewDoc.exists()) {
            // Agar document mil gaya, toh uski data ko state mein set kar rahe hain
            setInterview({ ...interviewDoc.data() } as Interview);
          }
        } catch (error) {
          // Agar koi error aata hai toh console mein log karenge
          console.log(error);
        }
      }
    };
    fetchInterview();
  }, [interviewId]); // Jab interviewId change ho, toh fetchInterview dubara chalega

  return (
    <div className="flex-col w-full my-4">
      {/* Agar interview data mil gaya, toh usko FormMockInterview component ko pass kar rahe hain */}
      <FormMockInterview initialData={interview} />
    </div>
  );
}

export default CreateEditPage;
