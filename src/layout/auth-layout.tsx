import { Outlet } from "react-router-dom"

function AuthenticationLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden flex item-center justify-center relative">
        {/* handler to store user data */}
        <img src="/assets/img/bg.png" className="absolute h-full w-full object-cover opacity-20" alt=""/>
        {/* React Router ka Outlet component, jaha hum different authentication-related components ko render karenge */}
        <Outlet/>
        

        
    </div>
  )
}

export default AuthenticationLayout