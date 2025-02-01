import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@clerk/clerk-react";
import { Menu } from "lucide-react";
import NavigationRoutes from "./navigation-routes";
import { NavLink } from "react-router-dom";

function ToggleContainer() {
  const { userId } = useAuth();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>
        <nav className="flex flex-col items-start gap-6">
          <NavigationRoutes isMobile />
          <NavLink
            to={"/generate"}
            className={({ isActive }) =>
              `text-base text-neutral-600 ${
                isActive ? "text-neutral-900 font-semibold" : ""
              }`
            }
          >
            Take an Interview
          </NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default ToggleContainer;
