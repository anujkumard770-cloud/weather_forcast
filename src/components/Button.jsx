import React from "react";

const Button = (props) => {
    return(
        <button id="search" className="btn" onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Button;