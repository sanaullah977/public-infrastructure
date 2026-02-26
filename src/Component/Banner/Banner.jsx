import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import P1 from '../../assets/p1.jpg.png'
import P2 from '../../assets/p2.jpg.png'
import P3 from '../../assets/p3.jpg.png'

const Banner = () => {
  return (
    <div >
       <Carousel  autoPlay={true}
       infiniteLoop={true}
       >
                <div>
                    <img className='rounded-xl' src={P1} />
                  
                </div>
                <div>
                    <img className='rounded-xl' src={P2} />
                    
                </div>
                <div>
                    <img className='rounded-xl' src={P3} />
                
                </div>
            </Carousel>
    </div>
  )
}

export default Banner
