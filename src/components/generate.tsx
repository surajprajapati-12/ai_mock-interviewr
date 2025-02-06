

import { Outlet } from "react-router-dom";

function Generate() { 
    // console.log("Generate Component Rendered");

    return (
        <div className="flex-col md:px-12">
            {/* <h1>Generate Page</h1> Add a heading to check rendering */}
             <Outlet /> {/*  This will render any nested routes  */}
        </div>
    );
}

export default Generate;
