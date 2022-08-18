import React, { useEffect, useState } from 'react'
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import images from './DataImages';

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 4000;

const Welcome = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {};
  }, [index]);
  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
      {images?
        images.map((img) => (
          <div className="slide">
              <img src={img.url} alt="" />
              <div className="img_overlay">
                <h1>{img.title}</h1>
                <p>{img.caption}</p>
              </div>
          </div>
        )):
        <p>Loading...</p>
      }
      </div>
    </div>
  )
}

export default Welcome