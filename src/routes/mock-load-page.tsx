import { CustomBreadCrumb } from "@/components/custom-bread-crum";
import { InterviewPin } from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { Lightbulb, Loader, Sparkles, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";  // Importing useEffect from React
import { Link, useNavigate, useParams } from "react-router-dom";
import WebCam from "react-webcam";
function MockLoadPage() {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading] = useState(false);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);

  const navigate = useNavigate();
  
  // Redirect to /generate if interviewId is not present
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  // Fetching interview details from Firestore
  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));  // Corrected interviewId
          if (interviewDoc.exists()) {
            setInterview({ ...interviewDoc.data() } as Interview);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchInterview();
  }, [interviewId,navigate]);  // Dependency on interviewId to refetch if it changes

  if (isLoading) {
    return <Loader className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb 
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />
        <Link to={`/generate/interview/${interviewId}/start`}>
            <Button size={"sm"}>
                Start <Sparkles/>
            </Button>
        </Link>
      </div>
      {interview && <InterviewPin data={interview} onMockPage />}

      <Alert className="flex items-start gap-3 p-4 -mt-3 border-yellow-200 rounded-lg bg-yellow-100/50">
        <Lightbulb className="w-5 h-5 text-yellow-600" />
        <div>
          <AlertTitle className="font-semibold text-yellow-800">
            Important Information
          </AlertTitle>
          <AlertDescription className="mt-1 text-sm text-yellow-700">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You’ll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="object-cover w-full h-full rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>

    </div>
  );
}

export default MockLoadPage;
