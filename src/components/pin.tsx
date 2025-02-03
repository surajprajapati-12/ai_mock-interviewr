import { Interview } from "@/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "@/components/tooltip-button";
import { Newspaper, Pencil, Sparkles, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { useAuth } from "@clerk/clerk-react";

// InterviewPinProps interface jo props expect karta hai
interface InterviewPinProps {
  data: Interview;  // Interview data jo component ko pass kiya jayega
  onMockPage?: boolean;  // Optional prop to check if it's on the mock page
}

export const InterviewPin = ({
  data,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate(); // Navigate function to route to different pages

  const [loading, setLoading] = useState(false);  // Loading state for delete operation
  const { userId } = useAuth();  // Get the current userId from Clerk

  // Delete function jo interview aur uske associated answers ko remove karta hai
  const onDelete = async () => {
    setLoading(true);  // Start loading when delete operation begins

    try {
      const interviewRef = doc(db, "interviews", data.id);  // Get the interview reference from Firestore
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),  // Filter answers based on current userId
        where("mockIdRef", "==", data.id)  // Filter answers for this specific interview
      );

      // Get all matching user answers
      const querySnap = await getDocs(userAnswerQuery);

      // Firebase batch operation to delete both interview and answers
      const batch = writeBatch(db);

      // Delete the interview document
      batch.delete(interviewRef);

      // Delete associated user answers
      querySnap.forEach((docRef) => batch.delete(docRef.ref));

      // Commit the batch operation
      await batch.commit();

      toast("Success", { description: "Your interview has been removed" }); // Success message
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong!. Please try again later",  // Error handling
      });
    } finally {
      setLoading(false);  // Stop loading after the operation is done
    }
  };

  return (
    <Card className="p-4 space-y-4 transition-all rounded-md shadow-none cursor-pointer hover:shadow-md shadow-gray-100">
      <CardTitle>{data?.position}</CardTitle>  {/* Displaying the position */}
      <CardDescription>{data?.description}</CardDescription>  {/* Description of the interview */}
      <div className="flex flex-wrap items-center w-full gap-2">
        {data.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {word}  {/* Displaying tech stack */}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {/* Displaying the creation date and time of the interview */}
          {`${new Date(data.createdAt.toDate()).toLocaleDateString("en-US", {
            dateStyle: "long",
          })} - ${new Date(data.createdAt.toMillis()).toLocaleTimeString(
            "en-US",
            {
              timeStyle: "short",
            }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center">
            {/* Edit button */}
            <TooltipButton
              content="Edit"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/${data.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-red-500"
              icon={<Pencil />}
              loading={false}
            />

            {/* Delete button */}
            <TooltipButton
              content="Delete"
              buttonVariant={"ghost"}
              onClick={onDelete}
              disbaled={false}
              buttonClassName="hover:text-red-500"
              icon={<Trash2 />}
              loading={loading}
            />

            {/* Feedback button */}
            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/feedback/${data.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-emerald-500"
              icon={<Newspaper />}
              loading={false}
            />

            {/* Start button */}
            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/interview/${data.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Sparkles />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
