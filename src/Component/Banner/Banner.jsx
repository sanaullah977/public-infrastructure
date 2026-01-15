import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import P1 from '../../assets/image (1).jpg'
import P2 from '../../assets/What_is_a_311_Citizen_Request_Management_Solution-1.jpg'
import P3 from '../../assets/opu-5-7.webp'

const Banner = () => {
  return (
    <div>
       <Carousel  autoPlay={true}
       infiniteLoop={true}>
                <div>
                    <img  src={P1} />
                  
                </div>
                <div>
                    <img  src={P2} />
                    
                </div>
                <div>
                    <img  src={P3} />
                
                </div>
            </Carousel>
    </div>
  )
}

export default Banner
