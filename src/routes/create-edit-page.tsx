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
  questions: { question: string; answer: string }[]; // Fixed: 'questions' instead of 'question'
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

function CreateEditPage() {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId)); // Fixed: Collection name should be "interviews"
          if (interviewDoc.exists()) {
            const data = interviewDoc.data() as Interview;
            setInterview({ ...data, id: interviewDoc.id }); // Ensure `id` is included
          }
        } catch (error) {
          console.error("Error fetching interview:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [interviewId]);

  return (
    <div className="flex-col w-full my-4">
      {loading ? (
        <p className="text-center">Loading interview...</p>
      ) : (
        <FormMockInterview initialData={interview ?? undefined} /> // 🔥 Fixed: Convert `null` to `undefined`
      )}
    </div>
  );
}

export default CreateEditPage;
