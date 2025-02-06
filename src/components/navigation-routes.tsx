import { MainRoutes } from "@/lib/helper"; // Main route has a href (for navigation) and a label (to display in the navigation).
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
    isMobile?: boolean;
}

function NavigationRoutes({ isMobile = false }: NavigationRoutesProps) {
    return (
        <ul className={`flex items-center gap-6 ${isMobile ? "items-start flex-col gap-8" : ""}`}>
            {MainRoutes.map(route => (
                <NavLink
                    key={route.href}
                    to={route.href}
                    className={({ isActive }) =>
                        `text-base text-neutral-600 ${isActive ? "text-neutral-900 font-semibold" : ""}`
                    }
                >
                    {route.label}  
                </NavLink>
            ))}
        </ul>
    );
}

export default NavigationRoutes;
