import { db } from "@/config/firebase.config";
import LoaderPage from "@/routes/loader-page";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc, FieldValue } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// User data ka type define kar rahe hain (TypeScript interface)
interface UserData {
  id: string; // User ka unique ID
  name: string; // User ka name
  email: string; // User ka email address
  imageUrl: string; // User ka profile image URL
  createdAt: FieldValue;  // Firestore ke timestamp ka type (dynamic value)
  updatedAt: FieldValue;  // Firestore ke timestamp ka type (dynamic value)
}

const AuthHandler = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser(); // User ki information le rahe hain

  const pathname = useLocation().pathname; // Current route path (URL)
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) { // Agar user signed in hai aur user object available hai
        setLoading(true); // Loading ko true kar rahe hain, takki loader show ho
        try {
          console.log("Checking Firestore for user:", user.id);

          const userRef = doc(db, "users", user.id); // Firestore mein users collection mein reference bana rahe hain
          const userSnap = await getDoc(userRef); // Firestore se user ka document fetch kar rahe hain

          if (!userSnap.exists()) { // Agar user Firestore mein nahi hai
            console.log("User does not exist, creating new entry...");

            const userData: UserData = { // New user ka data define kar rahe hain
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous", // Agar fullName nahi hai to firstName ya Anonymous
              email: user.primaryEmailAddress?.emailAddress || "N/A", // Agar email nahi hai to "N/A"
              imageUrl: user.imageUrl, // User ka profile image
              createdAt: serverTimestamp(), // Timestamp for account creation
              updatedAt: serverTimestamp(), // Timestamp for last update
            };

            await setDoc(userRef, userData); // Firestore mein user ka data store kar rahe hain
            console.log("User data successfully stored in Firestore.");
          } else {
            console.log("User already exists in Firestore:", userSnap.data()); // Agar user already Firestore mein hai to uska data fetch kar rahe hain
          }
        } catch (error) {
          console.error("Error storing user data:", error); // Agar koi error aati hai to usse log kar rahe hain
        } finally {
          setLoading(false); // Loading ko false kar rahe hain, kaam ho gaya
        }
      }
    };

    storeUserData(); // User data ko store karne ka function call kar rahe hain
  }, [isSignedIn, user, pathname, navigate]); // Jab bhi ye dependencies change hoti hain, effect dobara run hota hai

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHandler;
