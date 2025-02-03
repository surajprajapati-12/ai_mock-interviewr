import Header from "@/components/header"
import { Outlet } from "react-router-dom"
import Footer from "@/components/footer"
import AuthHandler from "@/handlers/auth-handler"


function PublicLayout() {
  return (
    <div className="w-full">
        {/* handler to store user data */}
        <AuthHandler/>
        <Header/>
        <Outlet/>
        <Footer/>

        
    </div> 
  )
}

export default PublicLayout