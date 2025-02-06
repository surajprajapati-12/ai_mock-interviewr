import { useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipButton } from "@/components/tooltip-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2, VolumeX } from "lucide-react";
import RecordAnswer from "./record-answer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

const QuestionSection = ({ questions }: QuestionSectionProps) => {
  // Speech aur webcam ka state manage kar rahe hain
  const [isPlaying, setIsPlaying] = useState(false); // Kya question ka speech play ho raha hai?
  const [isWebCam, setIsWebCam] = useState(false); // Webcam on/off state
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null); // Abhi kaunsa speech chal raha hai?
  //SpeechSynthesisUtterance ek built-in JavaScript object hai jo text ko speech (voice output) me convert karta hai.
  //Yeh state store karti hai currently playing speech object ya null agar koi speech nahi chal raha hai.
  //Jab new speech start hota hai toh currentSpeech update hota hai.
 //Jab speech end hota hai ya cancel hota hai, tab setCurrentSpeech(null) call hota hai.


 //Question ko speech synthesis se play karne ka function
  const handlePlayQuestion = (qst: string) => {
    // Agar speech already play ho raha hai toh usko stop karenge
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
         // Speech synthesis ka object banaya
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

         // Jab speech complete ho jaye toh state reset karna
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full p-4 border rounded-md min-h-96">
      {/*  Tabs for questions */}
      <Tabs defaultValue={questions[0]?.question} className="w-full space-y-12" orientation="vertical">
        <TabsList className="flex flex-wrap items-center justify-start w-full gap-4 bg-transparent">
          {questions?.map((tab, i) => (
            <TabsTrigger key={tab.question} value={tab.question} className={cn("data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2")}>
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>
        {/*  Question content aur controls */}
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base tracking-wide text-left text-neutral-500">{tab.question}</p>

            {/*  Play/Stop button for speech */}
            <div className="flex items-center justify-end w-full">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"}
                icon={isPlaying ? <VolumeX className="min-w-5 min-h-5 text-muted-foreground" /> : <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />}
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer question={tab} isWebCam={isWebCam} setIsWebCam={setIsWebCam} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionSection;
