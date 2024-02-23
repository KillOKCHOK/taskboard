import React,{useContext, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchBoards, deleteBoard, addBoard, updateBoard } from '../../store/actions/boardsActions'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import {Context} from '../../index'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Boards () {

        const boards = useSelector((state)=>state.boardsReducer.boards);
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {store} = useContext(Context);
        // let mystate = store.getState();
        const boardsRender = boards.map((board, index) => 
        <tr key={index} >
            <td onClick={() => navigate("./"+board.id)}>{board.id}</td>
            <td onClick={() => navigate("./"+board.id)}>{board.name}</td>
            <td onClick={() => navigate("./"+board.id)}>{board.userId}</td>
            <td>
                <ButtonGroup className="mb-2"> 
                    <EditBoardModal boardToEdit={board}/>
                    {/* <Button variant="danger" onClick={()=>dispatch(deleteBoard(board.id))}>Delete</Button> */}
                    <DeleteBoardModal boardToDelete={board}/>
                </ButtonGroup>
            </td>
        </tr>
        );

        useEffect(()=>{
            dispatch(fetchBoards());
            // console.log(store.getState());
        },[])
        
        return ( <div >
            <h1>Boards</h1>
                <br/>
                <Table className='mx-auto' striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>User id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>       
                        {boardsRender}
                    </tbody>
                </Table>
                <AddBoardModal/>
        </div> );

function AddBoardModal() {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        Create new board
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3" controlId="ValidationTitle01" onChange={(event)=>setTitle(event.target.value)}>
                <InputGroup.Text>Enter board title</InputGroup.Text>
                <Form.Control aria-label="Board Title" />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
                onClick={()=>dispatch(addBoard({name:title}, handleClose))}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  ////////////////////////////////////////////////////////////////
  function EditBoardModal(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Board</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3" controlId="ValidationTitle01" onChange={(event)=>setTitle(event.target.value)}>
                <InputGroup.Text>Enter board title</InputGroup.Text>
                <Form.Control aria-label="Board Title" defaultValue={props.boardToEdit.name}/>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
                onClick={()=>dispatch(updateBoard({id:props.boardToEdit.id ,name:title, userId:props.boardToEdit.userId, date:props.boardToEdit.date}, handleClose))}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  ////////////////////////////////////////////////////////////////
  function DeleteBoardModal(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
        Delete
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Board {props.boardToDelete.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" 
                onClick={()=>dispatch(deleteBoard(props.boardToDelete.id))}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}


 
export default Boards;