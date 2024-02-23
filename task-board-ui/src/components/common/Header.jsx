import React, { PureComponent } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {NavLink} from 'react-router-dom';


class Header extends PureComponent {
    constructor(props) {
        super(props)
        //776px
        this.state = {expanded :false};
      }
    
    state = {  }
    render() { 

        let setExpanded=(val)=>{
            this.setState({expanded:val})
        }


        return ( <div>
           
           <Navbar onToggle={() => setExpanded(this.state.expanded ? false : "expanded")} collapseOnSelect expand="lg" expanded={this.state.expanded} className="bg-body-tertiary header-pad" bg="dark" data-bs-theme="dark">
        {/* <div className='header-mg'> */}
        <Navbar.Brand onClick={() => setExpanded(false)}><NavLink exact to="/">TaskList</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <NavLink className={"nav-item"} onClick={() => setExpanded(this.state.expanded ? false : "expanded")} to="/boards">Boards</NavLink>
          <NavLink onClick={() => setExpanded(this.state.expanded ? false : "expanded")} className={"mx-auto"} style={{width:"130px", textAlign:"center"}} to="/about">About Us</NavLink>
         
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* </div> */}
    </Navbar>

        </div> );
    }
}
 
export default Header;