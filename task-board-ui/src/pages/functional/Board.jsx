import {useParams} from "react-router-dom";
import React,{useContext, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchBoards, deleteBoard, addBoard, updateBoard } from '../../store/actions/boardsActions'
import {fetchTasksByBoardId, addTask, deleteTask, updateTask} from '../../store/actions/taskActions'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import {Context} from '../../index'

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Board () {
    const {store} = useContext(Context);
    let { id } = useParams();
    const boards = store.getState().boardsReducer.boards;
    let index = boards.findIndex((obj) => obj.id == id);
    const tasks = useSelector((state)=>state.taskReducer.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let activeTasks = tasks.filter(function(obj) {
        return obj.active == true;
    });

    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    let activeTasksCards = activeTasks.map((task, index) => 
    <Card style={{ width: '28rem' }} className="mx-auto my-1">
        <Card.Body>
        <Card.Title>
            <Row>
                <Col className="col-2"></Col>
                <Col className="col-8">{task.name}</Col>
                <Col className="col-2">
                <Form>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        defaultChecked={task.active}
                        onClick={()=>{
                                task.active=!task.active;
                                dispatch(updateTask(task), ()=>{})
                            }
                        }
                    />
                    <div style={{font: 'italic large serif'}}>active</div>
                </Form>
                </Col>
            </Row>
        </Card.Title>
        <Card.Text>
            {task.description}
        </Card.Text>
        <ButtonGroup className="mb-2"> 
            <EditTaskdModal id={id} taskToEdit={task}/>
            <DeleteTaskModal taskToDelete={task}/>
        </ButtonGroup>
        </Card.Body>
    </Card>
    );
    
    let pasiveTasks = tasks.filter(function(obj) {
        return obj.active != true;
    });

    let pasiveTasksCards = pasiveTasks.map((task, index) => 
    <Card style={{ width: '28rem', opacity:'75%' }} className="mx-auto my-1">
        <Card.Body>
        <Card.Title>
            <Row>
                <Col className="col-2"></Col>
                <Col className="col-8">{task.name}</Col>
                <Col className="col-2">
                <Form>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        // label="active"
                        defaultChecked={task.active}
                        onClick={()=>{
                                task.active=!task.active;
                                dispatch(updateTask(task),()=>{})
                            }
                        }
                    />
                    <div style={{font: 'italic large serif'}}>active</div>
                </Form>
                </Col>
            </Row>
        </Card.Title>
        <Card.Text>
            {task.description}
        </Card.Text>
            <ButtonGroup className="mb-2"> 
                <EditTaskdModal id={id} taskToEdit={task}/>
                <DeleteTaskModal taskToDelete={task}/>
            </ButtonGroup>
        </Card.Body>
    </Card>
    );
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    useEffect(()=>{
        dispatch(fetchTasksByBoardId(id));
    },[])

    return ( <div>
        <h1>Board: {boards[index]?boards[index].name:"Not Found"}</h1>
        <div className="taskBoard">
            <Row>
                    <Col className="col-md-6 col-sm-12" style={{borderRight:"solid black 1px"}}>
                        <h3>Active</h3>
                        {activeTasksCards}
                    </Col>
                    <Col className="col-md-6 col-sm-12" style={{borderLeft:"solid black 1px"}}>
                        <h3>Archived</h3>
                        {pasiveTasksCards}
                    </Col>
            </Row>
        </div>
        <br/>
        <Row>
            <Col></Col>
            <Col>
                <AddTaskdModal id={id}/>
            </Col>
            <Col></Col>
        </Row>
      
    </div> );

function AddTaskdModal(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        Create new task
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create new Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3"  onChange={(event)=>setTitle(document.getElementById("ValidationTitle11").value)}>
                <InputGroup.Text>Enter task title</InputGroup.Text>
                <Form.Control aria-label="Board Title" id="ValidationTitle11" />
            </InputGroup>
            {/* <InputGroup className="mb-3" controlId="ValidationTitle01" >
                <InputGroup.Text>Enter task description</InputGroup.Text>
                <Form.Control aria-label="Board Title" />
            </InputGroup> */}
            <Form.Group className="mb-3" onChange={(event)=>setDescription(document.getElementById("ControlTextarea11").value)}>
                <Form.Label>Enter task description</Form.Label>
                <Form.Control as="textarea" id="ControlTextarea11" rows={3} aria-label="Board Title"/>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
                onClick={()=>dispatch(addTask({
                    name:title,
                    boardId:props.id, 
                    description:description, 
                    active:true
                }, handleClose))}
            >
              Save Task
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  function DeleteTaskModal(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
        Delete
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task {props.taskToDelete.name}?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" 
                onClick={()=>dispatch(deleteTask(props.taskToDelete.id))}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  function EditTaskdModal(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(()=>{
        setTitle(props.taskToEdit.name);
        setDescription(props.taskToEdit.description);
        setChecked(!props.taskToEdit.checked);
    },[])
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
        Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Row>
                <Col className="col-2"></Col>
                <Col className="col-8">
                    <Modal.Body>
                        <InputGroup className="mb-3"  >
                            <InputGroup.Text>Enter item title</InputGroup.Text>
                            <Form.Control aria-label="Task Title" id="ValidationTitle01" defaultValue={props.taskToEdit.name}  
                            onChange={(event)=>setTitle(document.getElementById("ValidationTitle01").value)}/>
                        </InputGroup>
                        <Form.Group className="mb-3"  >
                            <Form.Label>Enter task description</Form.Label>
                            <Form.Control as="textarea" id="ControlTextarea1" rows={3} aria-label="Task Description" defaultValue={props.taskToEdit.description} 
                            onChange={(event)=>setDescription(document.getElementById("ControlTextarea1").value)}/>
                        </Form.Group>
                    </Modal.Body>
                </Col>
                <Col className="col-2">
                    <Form>
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            // label="active"
                            defaultChecked={checked}
                            onClick={()=>setChecked(!checked)}
                        />
                        <div style={{font: 'italic large serif'}}>active</div>
                    </Form>
                </Col>
            </Row>
                <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" 
                onClick={()=>dispatch(updateTask({
                    id:props.taskToEdit.id,
                    name:title,
                    boardId:props.id, 
                    description:description, 
                    active:checked
                }, handleClose))}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  

    
}
 
export default Board;