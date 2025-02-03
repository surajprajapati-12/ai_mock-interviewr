
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "@/layout/public-layout";
import HomePage from "@/routes/home";
import AuthenticationLayout from "./layout/auth-layout";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import ProtectedRoutes from "./layout/protected-routes";
import MainLayout from "@/layout/main-layout";
import Generate from "./components/generate";
import Dashboard from "./routes/dashboard";
import CreateEditPage from "./routes/create-edit-page";
import MockLoadPage from "./routes/mock-load-page";
import { FormMockInterview } from "./components/form-mock-interview";
import MockInterviewPage from "./routes/mock-interview-page";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>

        {/* Authentication Layout */}
        <Route element={<AuthenticationLayout />}>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoutes> <MainLayout /> </ProtectedRoutes>}>
          {/* Parent route for Generate */}
          <Route path="/generate" element={<Generate />}>
            {/* Child route (Dashboard) will be rendered inside Generate.tsx */}
            <Route index element={<Dashboard />} />
            <Route path=":interviewID" element={<CreateEditPage/>}/>
            <Route path="interview/:interviewId" element={<MockLoadPage/>}/>
            <Route path="interview/:interviewId/start" 
            element={<MockInterviewPage/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
