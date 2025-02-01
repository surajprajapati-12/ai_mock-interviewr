import { db } from "@/config/firebase.config";
import LoaderPage from "@/routes/loader-page";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define a TypeScript interface for User data
interface UserData {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: any;  // Firestore timestamps are dynamic
  updatedAt: any;
}

const AuthHandler = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          console.log("Checking Firestore for user:", user.id);

          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            console.log("User does not exist, creating new entry...");

            const userData: UserData = {
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };

            await setDoc(userRef, userData);
            console.log("User data successfully stored in Firestore.");
          } else {
            console.log("User already exists in Firestore:", userSnap.data());
          }
        } catch (error) {
          console.error("Error storing user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHandler;
