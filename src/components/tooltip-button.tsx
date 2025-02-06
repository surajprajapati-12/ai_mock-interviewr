import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

// Button ke different variants ke types
type ButtonVariant =
  | "ghost"
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | null
  | undefined;

interface TooltipButtonProps {
  content: string; // Tooltip ka content (text)
  icon: React.ReactNode; // Button par jo icon dikhana hai
  onClick: () => void; // Button par click hone par jo action hona hai
  buttonVariant?: ButtonVariant; // Button ka style variant (e.g. 'ghost', 'outline')
  buttonClassName?: string; // Button ke liye custom CSS class (agar chahiye)
  delay?: number; // Tooltip ke show hone me kitna delay hoga (milliseconds me)
  disbaled?: boolean; // Button ko disable karne ka option
  loading?: boolean; // Button loading state me hai ya nahi
}

export const TooltipButton = ({
  content,
  icon,
  onClick,
  buttonVariant = "ghost",
  buttonClassName = "",
  delay = 0,
  disbaled = false,
  loading = false,
}: TooltipButtonProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        {/* TooltipTrigger - Button ko wrap karta hai, jo tooltip show karega jab user hover kare */}
        <TooltipTrigger
          className={disbaled ? "cursor-not-allowed" : "cursor-pointer"}
        >
          <Button
            size={"icon"} // Button ka size icon ke liye set hai
            disabled={disbaled} // Agar button disable hai to click nahi hoga
            variant={buttonVariant} // Button ka variant set karte hai (style)
            className={buttonClassName} // Agar koi custom class hai to wo apply hoti hai
            onClick={onClick} // Button par click hone par onClick function execute hoga
          >
            {/* Agar loading state true hai to loading spinner dikhayenge, nahi to icon dikhayenge */}
            {loading ? (
              <Loader className="min-w-4 min-h-4 animate-spin text-emerald-400" />
            ) : (
              icon
            )}
          </Button>
        </TooltipTrigger>
        {/* Tooltip content, agar loading hai to 'Loading...' show hoga */}
        <TooltipContent>
          <p>{loading ? "Loading..." : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
