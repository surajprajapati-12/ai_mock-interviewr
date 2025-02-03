// import { useAuth } from "@clerk/clerk-react";
// import Container from "./container";
// import LogoContainer from "./logo-container";
// import NavigationRoutes from "./navigation-routes";
// import { NavLink } from "react-router-dom";
// import ProfileContainer from "./profile-container";
// import ToggleContainer from "./toggle-container";

// function Header() {
//     const { userId } = useAuth();

//     return (
//         <header className="w-full transition-all duration-150 ease-in-out border-b">
//             {/* Your header content here */}
//             <Container>
//                 <div className="flex items-center w-full gap-4">
//                     {/* logo section */}
//                     <LogoContainer/>

//                     {/* navigation section */}
//                     <nav className="items-center hidden gap-3 md:flex">
//                         <NavigationRoutes/>
//                         <NavLink
                    
//                                 to={"/generate"}
//                                 className={({ isActive }) =>
//                                     `text-base text-neutral-600 ${isActive ? "text-neutral-900 font-semibold" : ""}`
//                                 }
//                         >
//                     {/* Take an Interview --> wahi user bs dekh sakte hai jo authenticated hai */}
//                     Take an Interview
//                 </NavLink>
//                     </nav>
                    
//                     {/* profile section */}
//                     <div className="flex items-center gap-6 ml-auto">
//                         {/* profile section */}
//                         <ProfileContainer/>
//                         {/* mobile toggle section */}
//                         <ToggleContainer/>
//                     </div>
//                 </div>
//             </Container>
//         </header>
//     );
// }

// export default Header;


import { useAuth } from "@clerk/clerk-react";
import Container from "./container";
import LogoContainer from "./logo-container";
import NavigationRoutes from "./navigation-routes";
import { NavLink } from "react-router-dom";
import ProfileContainer from "./profile-container";
import ToggleContainer from "./toggle-container";

function Header() {
    const { userId } = useAuth();
    console.log("Header Rendered, userId:", userId);

    return (
        <header className="w-full transition-all duration-150 ease-in-out border-b">
            <Container>
                <div className="flex items-center w-full gap-4">
                    {/* logo section */}
                    <LogoContainer />

                    {/* navigation section */}
                    <nav className="items-center hidden gap-3 md:flex">
                        <NavigationRoutes />
                        {userId && (
                            <NavLink
                                to="/generate"
                                className={({ isActive }) =>
                                    `text-base text-neutral-600 ${isActive ? "text-neutral-900 font-semibold" : ""}`
                                }
                            >
                                Take an Interview
                            </NavLink>
                        )}
                    </nav>

                    {/* profile section */}
                    <div className="flex items-center gap-6 ml-auto">
                        <ProfileContainer />
                        <ToggleContainer />
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;

