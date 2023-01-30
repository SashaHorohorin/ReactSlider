import { useEffect, useState } from "react";
import data from "../../data";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "../Button/Button";
import Slide from "../Slide/Slide";

const Slider = () => {
  const [people, setPeople] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (currentIndex < 0) {
      setCurrentIndex(lastIndex);
    }
    if (currentIndex > lastIndex) {
      setCurrentIndex(0);
    }
  }, [currentIndex, people]);

  useEffect(() => {
    let slider = setInterval(
      () => setCurrentIndex((prevState) => prevState + 1),
      5000
    );
    return () => {
      clearInterval(slider);
    };
  }, [currentIndex]);

  return (
    <>
        <div className="section-center">
          {people.map((person, personIndex) => {
            let position = "nextSlide";
            if (personIndex === currentIndex) {
              position = "activeSlide";
            }
            if (
              personIndex === currentIndex - 1 ||
              (currentIndex === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (

                <Slide person={person} position={position} chengeCurrentIndex={(index) => setCurrentIndex(index)}/>
              
            );
          })}

          <Button chengeIndex={() => setCurrentIndex((prevState) => prevState - 1)} name='prev'>
            <FiChevronLeft />
          </Button>
          <Button chengeIndex={() => setCurrentIndex((prevState) => prevState + 1)} name='next'>
            <FiChevronRight />
          </Button>

        </div>
    </>
  );
};

export default Slider;
