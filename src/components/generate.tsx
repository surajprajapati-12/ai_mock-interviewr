

import { Outlet } from "react-router-dom";

function Generate() { 
    // console.log("Generate Component Rendered");

    return (
        <div className="flex-col md:px-12">
            {/* <h1>Generate Page</h1> Add a heading to check rendering */}
            <Outlet /> 
        </div>
    );
}

export default Generate;
