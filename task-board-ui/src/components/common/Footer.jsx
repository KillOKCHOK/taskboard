import React, { PureComponent } from 'react';

class Footer extends PureComponent {
    
    state = {  }
    render() { 
        return(
        
            <div className='footerComponent bg-dark'>
                <div>© 2020 ChicagoCyberTech LLC - Call ‪(331) 642-1137‬</div>
                <a href='https://ru.freepik.com/vectorjuice' target="_blank" rel="noopener noreferrer">Background & pictures created on freepik - ru.freepik.com</a>
            </div>
        );
    }
}
 
export default Footer;