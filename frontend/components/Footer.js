import React from "react";
import { BsFacebook,BsTwitter,BsInstagram } from "react-icons/bs";

const Footer = () => {
    return (
        <React.Fragment>
            <footer  style={{ marginBlockStart:'auto', bottom: 0, width:"100%", paddingBlockEnd:'3vh', background:'#EEEEEE'}}>
            <div style={{paddingInline: '17.5vw'}} >
                <hr/>
            </div>
            
                <div className="row" style={{textAlign:'center'}}  >
                <div className="col-3">
                    
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-4" style={{color: '#22A39F'}} ><BsFacebook /></div>
                        <div className="col-4" style={{color: '#22A39F'}} ><BsInstagram/></div>
                        <div className="col-4" style={{color: '#22A39F'}} ><BsTwitter/></div>
                    </div>
                    
                    
                </div>
                <div className="col-3">
                    
                </div>
                        
                </div>
            </footer>

        </React.Fragment>
    )
}

export default Footer;