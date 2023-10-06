import React, { useEffect, useState } from "react";
import { useForm, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Reset from "./reset";
import { supabase } from './supabaseClient'
import UserCard from "./userCard";

//adding constraints to schema
const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required().positive().integer(),
  website: yup.string().url()
});

//creating values for resetting form
export type FormValues = {
    firstName: string;
    lastName: string;
    age: number;
    website: string;
  };

export const defaultValues: DefaultValues<FormValues> = {
    firstName: "",
    lastName: "",
    age: 0,
    website: ""
  };

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(SignupSchema)
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data)
  };

  const [ fname, setFName ] = useState("");
  const [ lname, setLName ] = useState("");
  const [ age, setAge ] = useState(0);
  const [ website, setWebsite ] = useState("");
  const [ users, setUsers ] = useState([]);

  console.log(fname)

  useEffect(() => {
    getUsers();
  }, [])

  async function getUsers() {
    try {
        const { data, error } = await supabase
        // retrieving 10 users from users table
        .from("users")
        .select("*")
        .limit(10)
        if (error) throw error;
        if (data != null) {
            setUsers(data);
        }
    } catch (error) {
        alert(error.message);
    }
  }

  console.log(users)

  async function createUser() {
    try {
        const { data, error } = await supabase
        // inserting into users table
        .from("users")
        .insert({
            fname: fname,
            lname: lname,
            age: age,
            website: website
        })
        .single() //inserting only 1 user
        if (error) throw error;
        window.location.reload() //reload page once user has been created
    } catch (error) {
        alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Patient Form</h1>
        <label>First Name</label>
        <input {...register("firstName")} onChange={(e) => setFName(e.target.value)}/>
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Last Name</label>
        <input {...register("lastName")} onChange={(e) => setLName(e.target.value)} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" onChange={(e) => setLName(e.target.value)} {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>Website (example: https://www.google.ca)</label>
        <input {...register("website")} onChange={(e) => setLName(e.target.value)} />
        {errors.website && <p>{errors.website.message}</p>}
      </div>
      <Reset {...{ reset }} />
      <button onClick={() => createUser()}>Create Users in Supabase DB</button>
      <input type="submit" />
      <div>
        {users.map((user) => (
            // <p>First User</p>
            <UserCard user={user} />
        ))}
      </div>
    </form>
  );
}