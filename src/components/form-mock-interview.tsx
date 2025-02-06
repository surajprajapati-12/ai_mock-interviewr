import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { CustomBreadCrumb } from "@/components/custom-bread-crum";
import Headings from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/scripts/index";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { toast } from "sonner";

// Define the form validation schema using zod
const formSchema = z.object({
  position: z.string().min(1, "Position is required").max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce.number().min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

type FormData = z.infer<typeof formSchema>;

type FormMockInterviewProps = {
  initialData?: (FormData & { id?: string }) | undefined;
};

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { position: "", description: "", experience: 0, techStack: "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData ? initialData.position : "Create a new mock interview";
  const breadCrumpPage = initialData ? initialData.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated!", description: "Changes saved successfully" }
    : { title: "Created!", description: "New Mock Interview created" };

  // Helper function to clean AI response
  const cleanJsonResponse = (responseText: string) => {
    try {
      let cleanText = responseText.trim().replace(/(json|```|`)/g, "");
      const jsonArrayMatch = cleanText.match(/\[.*\]/s);
      return jsonArrayMatch ? JSON.parse(jsonArrayMatch[0]) : [];
    } catch (error) {
      console.error("Invalid JSON format:", error);
      return [];
    }
  };

  // Function to generate AI interview questions
  const generateAiResult = async (data: FormData) => {
    const prompt = `
      Generate a JSON array of 5 technical interview questions with detailed answers based on:
      - Job Position: ${data.position}
      - Job Description: ${data.description}
      - Years of Experience Required: ${data.experience}
      - Tech Stacks: ${data.techStack}
    `;
    try {
      const aiResult = await chatSession.sendMessage(prompt);
      return cleanJsonResponse(aiResult.response.text());
    } catch (error) {
      console.error("AI Generation Error:", error);
      return [];
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      const aiResult = await generateAiResult(data);
      if (initialData) {
        await updateDoc(doc(db, "interviews", initialData.id!), {
          ...data,
          questions: aiResult,
          updatedAt: serverTimestamp(),
        });
      } else {
        const interviewRef = await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: aiResult,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "interviews", interviewRef.id), { id: interviewRef.id, updatedAt: serverTimestamp() });
      }

      toast(toastMessage.title, { description: toastMessage.description });
      navigate("/generate", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Error", { description: "Something went wrong. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) form.reset(initialData);
  }, [initialData, form]);

  return (
    <div className="flex-col w-full space-y-4">
      <CustomBreadCrumb breadCrumbPage={breadCrumpPage} breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]} />
      <div className="flex items-center justify-between w-full mt-4">
        <Headings title={title} isSubHeading />
        {initialData && <Button size="icon" variant="ghost"><Trash2 className="text-red-500 min-w-4 min-h-4" /></Button>}
      </div>
      <Separator className="my-4" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-start w-full gap-6 p-8 rounded-lg shadow-md">
          {["position", "description", "experience", "techStack"].map((fieldName) => (
            <FormField key={fieldName} control={form.control} name={fieldName as keyof FormData}
              render={({ field }) => (
                <FormItem className="w-full space-y-4">
                  <div className="flex items-center justify-between w-full">
                    <FormLabel>{fieldName === "position" ? "Job Role / Job Position" : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                    <FormMessage className="text-sm" />
                  </div>
                  <FormControl>
                    {fieldName === "description" || fieldName === "techStack" ? (
                      <Textarea className="h-12" disabled={isLoading} placeholder={`Enter ${fieldName}`} {...field} value={field.value ?? ""} />
                    ) : (
                      <Input type={fieldName === "experience" ? "number" : "text"} className="h-12" disabled={isLoading} placeholder={`Enter ${fieldName}`} {...field} value={field.value ?? (fieldName === "experience" ? 0 : "")} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-center justify-end w-full gap-6">
            <Button type="reset" size="sm" variant="outline" disabled={isSubmitting || isLoading}>Reset</Button>
            <Button type="submit" size="sm" disabled={isSubmitting || !isValid || isLoading}>{isLoading ? <Loader className="text-gray-50 animate-spin" /> : actions}</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormMockInterview;
