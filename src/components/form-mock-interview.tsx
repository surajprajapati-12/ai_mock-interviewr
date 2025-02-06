import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { Interview } from "@/types";
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

// Form ka validation schema zod se define kiya hai
const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required") // Position required hona chahiye
    .max(100, "Position must be 100 characters or less"), // Maximum length 100 characters
  description: z.string().min(10, "Description is required"), // Description minimum 10 characters ka hona chahiye
  experience: z.coerce
    .number()
    .min(0, "Experience cannot be empty or negative"), // Experience negative ya empty nahi hona chahiye
  techStack: z.string().min(1, "Tech stack must be at least a character"), // Tech stack ka input hona chahiye
});


// Form ka validation schema zod se define kiya hai
type FormData = z.infer<typeof formSchema>;

 const FormMockInterview = ({ initialData }: FormMockInterview) => {
  // useForm hook ka use karke form ka state manage kar rahe hain
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema), // Validation ke liye zod ka resolver use kiya hai
    defaultValues: initialData || {}, // Default values agar initialData ho to set kar rahe hain
  });

  const { isValid, isSubmitting } = form.formState; // Form ke validation aur submission state ko track kar rahe hain
  const [isLoading, setIsLoading] = useState(false); // Loading state manage karne ke liye
  const navigate = useNavigate(); // Navigation handle karne ke liye
  const { userId } = useAuth(); // Logged-in user ka ID fetch kar rahe hain

  const title = initialData ? initialData.position : "Create a new mock interview";
  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create"; // Button text ko dynamically set kar rahe hain
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  // AI response ko clean karne ki helper function
  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim(); //Pehle responseText ke leading aur trailing spaces ko hata dete hain.
    cleanText = cleanText.replace(/(json|```|`)/g, ""); //removing unwanted character by replace function
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);  //extracting json using regex
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    try {
      return JSON.parse(cleanText); // Response ko valid JSON me convert kar rahe hain
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  // AI se interview questions generate karne ka function
  const generateAiResult = async (data: FormData) => {
    const prompt = `
      As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer":

      [
        { "question": "<Question text>", "answer": "<Answer text>" },
        ...
      ]

      Job Information:
      - Job Position: ${data?.position}   
      - Job Description: ${data?.description}
      - Years of Experience Required: ${data?.experience}
      - Tech Stacks: ${data?.techStack}
    `;
    //OnSubmit se data aa rha hai

    const aiResult = await chatSession.sendMessage(prompt); // chatSession API ko ek prompt bhej rahe hain, jo AI ko interview questions generate karne ke liye guide karega.
    const cleanedResponse = cleanJsonResponse(aiResult.response.text());

    return cleanedResponse;
  };

  // Form ko submit karte waqt jo actions perform karna hai
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);  //setloading ko true rakh rhe hai to inform the user that the process is going

      if (initialData) {
        // Agar initialData hai toh update karenge
        if (isValid) {
          const aiResult = await generateAiResult(data);

          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: aiResult, // Updated questions ko set kar rahe hain
            ...data, //Adding all the form data (position, description, experience, etc.)
            updatedAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      } else {
        // Agar initialData nahi hai toh new interview create karenge
        if (isValid) {
          const aiResult = await generateAiResult(data);

          const interviewRef = await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });

          const id = interviewRef.id; // Newly created document ka ID fetch kar rahe hain

          await updateDoc(doc(db, "interviews", id), {
            id, // ID ko update kar rahe hain Firestore mein
            updatedAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Error..", {
        description: `Something went wrong. Please try again later`,
      });
    } finally {
      setIsLoading(false); // Jab process complete ho jaata hai, loading state ko false karte hain
    }
  };

  // Agar initialData change ho raha ho toh form ko reset karenge
  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

  return (
    <div className="flex-col w-full space-y-4">
      {/* Bread Crumb */}
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="flex items-center justify-between w-full mt-4">
        <Headings title={title} isSubHeading /> {/* Page ka title display kar rahe hain */}

        {initialData && (
          <Button size={"icon"} variant={"ghost"}>
            <Trash2 className="text-red-500 min-w-4 min-h-4" /> {/* Agar initialData hai, toh delete button dikhayenge */}
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <div className="my-6"></div>
        {/* FormProvider se form ka state pass kar rahe hain */}
      <FormProvider {...form}> 
        <form
        // Form submit hone par handleSubmit function ko call karenge
          onSubmit={form.handleSubmit(onSubmit)}
          // This method is used to handle form submission. It ensures that the form is validated before calling the onSubmit function.
          className="flex flex-col items-start justify-start w-full gap-6 p-8 rounded-lg shadow-md "

        >
          <FormField
            control={form.control} //react-hook-form ka control pass kar rahe hain
            name="position"
            render={({ field }) => ( // Form input field render kar rahe hain
              <FormItem className="w-full space-y-4">
                <div className="flex items-center justify-between w-full">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={isLoading}  //Input field ko disable kar rahe hain jab form submit ho raha ho
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="flex items-center justify-between w-full">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={isLoading}
                    placeholder="eg:- describe your job role"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="flex items-center justify-between w-full">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={isLoading}
                    placeholder="eg:- 5 Years"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="flex items-center justify-between w-full">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={isLoading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end w-full gap-6">
            <Button
              type="reset" //Resets the form 
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || isLoading} //Disables the button if form is submitting or if isLoading is true
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || isLoading}
            >
              {isLoading ? (
                <Loader className="text-gray-50 animate-spin" /> // Show loader spinner when isLoading is true 
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default FormMockInterview;
