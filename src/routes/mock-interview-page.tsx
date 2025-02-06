import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";

import { db } from "@/config/firebase.config";
import { LoaderPage } from "@/views/loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crum";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Interview } from "@/types";
import QuestionSection from "@/components/question-section";

const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      navigate("/generate", { replace: true });
      return;
    }

    const fetchInterview = async () => {
      setIsLoading(true);
      try {
        const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
        if (interviewDoc.exists()) {
          setInterview({ ...interviewDoc.data() } as Interview);
        } else {
          navigate("/generate", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
        toast("Error", { description: "Something went wrong. Try again later." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) return <LoaderPage className="w-full h-[70vh]" />;

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          { label: interview?.position || "", link: `/generate/interview/${interview?.id}` },
        ]}
      />

      <Alert className="flex items-start gap-3 p-4 border rounded-lg bg-sky-100 border-sky-200">
        <Lightbulb className="w-5 h-5 text-sky-600" />
        <div>
          <AlertTitle className="font-semibold text-sky-800">Important Note</AlertTitle>
          <AlertDescription className="mt-1 text-sm leading-relaxed text-sky-700">
            Press "Record Answer" to begin answering the question. Your responses will be compared to the ideal answers.
            <br />
            <strong>Note:</strong> Your video is never recorded. You can disable the webcam anytime.
          </AlertDescription>
        </div>
      </Alert>

      {(interview?.questions?.length) && (
        <div className="flex flex-col items-start w-full gap-4 mt-4">
          <QuestionSection questions={interview.questions} />
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;
