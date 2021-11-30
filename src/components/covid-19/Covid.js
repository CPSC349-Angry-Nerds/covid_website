import React from "react";
import './Covid.css';

function Covid() {
    return (
         <header class="topnav">
             <div class= "u-centered">
                 <h1>Angry Nerds: COVID-19 Website</h1>
                 <div className="icon-container row">
                 <div className="icon-img1 col-3">
                 <img className="covid19" src="static/covid19.png " alt="Covid" />
             </div>
             </div>
             </div>
         </header>
    );
}

export default Covid