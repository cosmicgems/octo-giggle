import React from "react";
import { useMediaQuery } from "react-responsive";


const Subscribe = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 431px)'
    })
    const isTablet = useMediaQuery({
        query: '(min-width: 446px)'
    })
    const isLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })
    const isDesktop = useMediaQuery({
        query: '(min-width: 1920px)'
    })
    
    return (
        <React.Fragment>
            {isMobile && 
            <div style={{ color: '#222222'}}>
            
          
                <p style={{marginBlock: '0', paddingBlock: '1vh', textAlign:'center', fontFamily: 'Great Vibes', fontSize:'1.5rem'}}>Curating a lifestyle worth living.</p>
            </div>
            }
            {isTablet && !isLaptop &&
                <div style={{ color: '#222222'}}>
            
           
                <p style={{marginBlock: '0', paddingBlock: '1vh', textAlign:'center', fontFamily: 'Great Vibes', fontSize:'1.5rem'}}>Curating a lifestyle worth living.</p>
            </div>
            }
            {isLaptop && !isDesktop && 
            
                <div style={{ color: '#222222'}}>
            
            
                <p style={{marginBlock: '0', paddingBlock: '1vh', textAlign:'center', fontFamily: 'Great Vibes', fontSize:'1.5rem'}}>Curating a lifestyle worth living.</p>
            </div>
            }
            {isDesktop && 
            
                <div style={{ color: '#222222'}}>
            
                <p style={{marginBlock: '0', paddingBlock: '1vh', textAlign:'center', fontFamily: 'Great Vibes', fontSize:'1.5rem'}}>Curating a lifestyle worth living.</p>
            </div>
            }
        </React.Fragment>
            
    )
}

export default Subscribe;