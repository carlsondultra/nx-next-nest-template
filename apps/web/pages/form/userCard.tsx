import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

function UserCard(props) {
    const user = props.user;

    const [ editing, setEditing ] = useState(false);
    const [ fname, setFName ] = useState(user.fname);
    const [ lname, setLName ] = useState(user.lname);
    const [ age, setAge ] = useState(user.age);
    const [ website, setWebsite ] = useState(user.website);

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{user.fname}</Card.Title>
                        <Card.Text>{user.description}</Card.Text>
                        {/* <Button variant="danger">Delete user</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Edit user</Button> */}
                    </>
                :
                    <>
                        <h4>Editing user</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
                        <br></br>
                        <Form.Label>user fname</Form.Label>
                        <Form.Control
                            type="text"
                            id="fname"
                            defaultValue={user.fname}
                            onChange={(e) => setFName(e.target.value)}
                        />
                        <Form.Label>user Description</Form.Label>
                        <Form.Control
                            type="text"
                            id="lname"
                            defaultValue={user.lname}
                            onChange={(e) => setLName(e.target.value)}
                        />
                        <br></br>
                        {/* <Button onClick={() => updateuser()}>Update user in Supabase DB</Button> */}
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default UserCard;