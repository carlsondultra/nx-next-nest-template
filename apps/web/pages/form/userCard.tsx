// import {Button, Card, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from './supabaseClient';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


function UserCard(props) {
    const user = props.user;

    const [ editing, setEditing ] = useState(false);
    const [ fname, setFName ] = useState(user.fname);
    const [ lname, setLName ] = useState(user.lname);
    const [ age, setAge ] = useState(user.age);
    const [ website, setWebsite ] = useState(user.website);

    async function updateUser() {
        try {
            const { data, error } = await supabase
            // updating users table
            .from("users")
            .update({
                fname: fname,
                lname: lname,
                age: age,
                website: website
            })
            .eq("id", user.id) //looking for the row that equals the ID currently being edited
            if (error) throw error;
            window.location.reload() //reload page once user has been created
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteUser() {
        try {
            const { data, error } = await supabase
            // deleting from users table
            .from("users")
            .delete()
            .eq("id", user.id) //looking for the row that equals the ID currently being deleted
            if (error) throw error;
            window.location.reload() //reload page once user has been created
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{user.fname}</Card.Title>
                        <Card.Text>{user.lname}</Card.Text>
                        <Card.Text>{user.age}</Card.Text>
                        <Card.Text>{user.website}</Card.Text>
                        <Button variant="danger" onClick={() => deleteUser()}>Delete user</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Edit user</Button>
                    </>
                :
                    <>
                        <h4>Editing user</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
                        <br></br>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="fname"
                            defaultValue={user.fname}
                            onChange={(e) => setFName(e.target.value)}
                        />
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="lname"
                            defaultValue={user.lname}
                            onChange={(e) => setLName(e.target.value)}
                        />
                        <br></br>
                        <Form.Control
                            type="text"
                            id="age"
                            defaultValue={user.age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <br></br>
                        <Form.Control
                            type="text"
                            id="website"
                            defaultValue={user.website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateUser()}>Update User</Button>
                    </>
                }
            </Card.Body>
        </Card>
    )
}

export default UserCard;