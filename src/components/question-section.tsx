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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full p-4 border rounded-md min-h-96">
      <Tabs defaultValue={questions[0]?.question} className="w-full space-y-12" orientation="vertical">
        <TabsList className="flex flex-wrap items-center justify-start w-full gap-4 bg-transparent">
          {questions?.map((tab, i) => (
            <TabsTrigger key={tab.question} value={tab.question} className={cn("data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2")}>
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            <p className="text-base tracking-wide text-left text-neutral-500">{tab.question}</p>

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
