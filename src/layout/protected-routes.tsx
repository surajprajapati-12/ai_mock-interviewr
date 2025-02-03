


import LoaderPage from "@/routes/loader-page";
import { useAuth } from "@clerk/clerk-react"; 
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth(); 

  console.log("Auth Loaded:", isLoaded);
  console.log("Is Signed In:", isSignedIn);

  if (!isLoaded) {
    return <LoaderPage />;
  }

  if (!isSignedIn) {
    return <Navigate to="/signin" />;
  }

  return <>{children}</>; // Ensure children are correctly wrapped
};

export default ProtectedRoutes;
