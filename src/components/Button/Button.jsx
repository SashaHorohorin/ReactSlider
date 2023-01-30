import React from "react";


const Button = ({children, chengeIndex, name}) => {
  return (
    <button
      className={name}
      onClick={() => chengeIndex()}
    >
      {children}
    </button>
  );
};

export default Button;
