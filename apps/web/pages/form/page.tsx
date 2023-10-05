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
  const [ age, setAge ] = useState("");
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
        <input {...register("lastName")} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label>Website (example: https://www.google.ca)</label>
        <input {...register("website")} />
        {errors.website && <p>{errors.website.message}</p>}
      </div>
      <Reset {...{ reset }} />
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