
import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer";

const MainLayout = () => {
  // console.log("MainLayout Rendered");
  
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container flex-grow mx-auto">
        <main className="flex-grow">
          <Outlet /> {/* This is where `Generate` or `Dashboard` should load */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

