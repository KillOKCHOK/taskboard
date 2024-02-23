import React, { PureComponent } from 'react';
import { Container } from "react-bootstrap";
import { Routes, Route } from 'react-router-dom';

// import MainPage from '../../pages/classbased/MainPage';
// import Boards from '../../pages/classbased/Boards';
// import AboutUs from '../../pages/classbased/AboutUs';
import MainPage from '../../pages/functional/MainPage';
import Boards from '../../pages/functional/Boards';
import Board from '../../pages/functional/Board';
import AboutUs from '../../pages/functional/AboutUs';

class ContentComponent extends PureComponent {
    
    state = {  }
    render() { 
        return ( <div>
                <Container className="container py-3">
                        <Routes>
                                <Route exact path='/' element={<MainPage />}/>
                                <Route exact path='/main' element={<MainPage />}/>
                                <Route exact path='/boards' element={<Boards/>}/>
                                <Route exact path='/boards/:id' element={<Board/>}/>
                                <Route exact path='/about' element={<AboutUs/>}/>
                        </Routes>
                </Container>
        </div> );
    }
}
 
export default ContentComponent;