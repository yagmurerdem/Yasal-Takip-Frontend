import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap'
import {
    BrowserRouter as Router,

    Route,
    Switch,
    Link
} from "react-router-dom";

import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import BorcDetayComponent from './BorcDetayComponent';
import AvukatComponent from './AvukatComponent';
import BorcDetayEkleComponent from './BorcDetayComponent';
import AvukatEkle from './AvukatEkle';


export default class NavbarComp extends Component {
    state={
        isLogged: false
    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                                    <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
                                    <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
                                    <Nav.Link as={Link} to={"/borcdetay"}>Borç Detayları</Nav.Link>
                                    <Nav.Link as={Link} to={"/avukat"}>Avukatlar</Nav.Link>
                                    <Nav.Link as={Link} to={"/borcdetayekle"}>Borc Detay Ekle</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Switch>

                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/borcdetay">
                            <BorcDetayComponent />
                        </Route>
                        <Route path="/avukat">
                            <AvukatComponent />
                        </Route>
                        <Route path="/borcdetayekle">
                            <BorcDetayEkleComponent />
                        </Route>
                        <Route path="/avukatekle">
                            <AvukatEkle />
                        </Route>
                      
                    </Switch>
                </div>
            </Router >
        );
    }
}
