import { useEffect, useState } from "react";
import data from "./data";
import './App.css';
import {FaQuoteRight} from 'react-icons/fa'
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'

function App() {
  const [people, setPeople] = useState(data);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (currentIndex < 0){
      setCurrentIndex(lastIndex);
    }
    if(currentIndex > lastIndex){
      setCurrentIndex(0)
    }
  }, [currentIndex, people]);

  useEffect(() => {
    let slider = setInterval(() => setCurrentIndex(prevState => prevState + 1), 5000)
    return () => {
      clearInterval(slider);
    }
  }, [currentIndex])

  let x1 = null;
  let y1 = null;

  let handleMouseDown = (event) => {
    x1 = event.clientX;
    y1 = event.clientY;
  }
  let xDiff = 0;

  let handleMouseUp = (event) => {
    if(!x1 || !y1){
      return false;
    }
    let x2 = event.clientX;

    xDiff = x2 - x1;

    if(xDiff > 0){
      console.log(setCurrentIndex(prevState => prevState - 1));
    }else{
      console.log(setCurrentIndex(prevState => prevState + 1));
    }
  }

  return (
    <div className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const {id, image, name, title} = person;
          let corr = 100;
          let position = 'nextSlide';
          if (personIndex === currentIndex){
            position = 'activeSlide';
            corr = 0;
          }

          if (personIndex === currentIndex - 1 || (currentIndex === 0 && personIndex === people.length - 1)){
            position = 'lastSlide'
            corr = -100;
          }
          return (
            <article style={{transform: `translateX(${corr}%)`}} className={position} key={id} onMouseDown={(event) => handleMouseDown(event)} onMouseUp={(event) => handleMouseUp(event)} >
              <img draggable="false" src={image} alt={name} className='person-img'/>
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <FaQuoteRight className='icon'/>
            </article>
          )

        })}

        <button className="prev" onClick={() => setCurrentIndex(prevState => prevState - 1)} >
          <FiChevronLeft />
        </button>

        <button className="next" onClick={() => setCurrentIndex(prevState => prevState + 1)} >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default App;
