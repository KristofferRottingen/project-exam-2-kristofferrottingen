import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';

function ShareOnSocials() {
  return (
    <div className='sos-section'>
        <div className='sos-right'>
            <div className='sos-right-content'>
              <h2>Del på sosiale medier</h2>
              <div className='line-sos'></div>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem.</p>
              <div className='sos-right-socials'>
                  <FontAwesomeIcon icon={faFacebookSquare} />
                  <FontAwesomeIcon icon={faInstagram} />
                  <FontAwesomeIcon icon={faTwitterSquare} />
              </div>            
            </div>
        </div>
    </div>
  )
}

export default ShareOnSocials