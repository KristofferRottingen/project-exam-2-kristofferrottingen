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
              <p>Vi vil fortsette utviklingen av våre eksisterende og nye produkter inn i fremtiden. Hele tiden med mål om å tilpasse bruksområde, kvalitet og pris til det beste for brukeren. Del gjerne din opplevelse med Evon produktene våre på sosiale medier med hastaggen #Evon.</p>
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