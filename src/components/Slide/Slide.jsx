import React from "react";

const Slide = ({ person, position, chengeCurrentIndex }) => {
  const { id, image, name } = person;

  let x1 = null;
  let y1 = null;

  let handleMouseDown = (event) => {
    x1 = event.clientX;
    y1 = event.clientY;
  };
  let xDiff = 0;

  let handleMouseUp = (event) => {
    if (!x1 || !y1) {
      return false;
    }
    let x2 = event.clientX;

    xDiff = x2 - x1;

    if (xDiff > 0) {
      chengeCurrentIndex((prevState) => prevState - 1);
    } else {
      chengeCurrentIndex((prevState) => prevState + 1);
    }
  };

  return (
    <div>
      <article
        className={position}
        key={id}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseUp={(event) => handleMouseUp(event)}
      >
        <img draggable="false" src={image} alt={name} className="person-img" />
      </article>
    </div>
  );
};

export default Slide;
