import Header from "@/components/header"
import { Outlet } from "react-router-dom"
import Footer from "@/components/footer"


function PublicLayout() {
  return (
    <div className="w-full">
        {/* handler to store user data */}
        <Header/>
        <Outlet/>
        <Footer/>

        
    </div>
  )
}

export default PublicLayout