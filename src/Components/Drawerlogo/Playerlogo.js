import React from "react";
import playerlogo from "../../Assets/Images/playerlogo.png";

export default function Playerlogo(props){
        return(
            <div>
                <img src={playerlogo} alt="playerlogo" />
            </div>
        );
}