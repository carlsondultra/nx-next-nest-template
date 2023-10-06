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
        mode: 'all', // THIS WILL ALLOW ALL-TIME VALIDATION (May have performance impact)
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        console.log(data)
    };

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [age, setAge] = useState(0);
    const [website, setWebsite] = useState("");
    const [users, setUsers] = useState([]);


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
                <input {...register("firstName")} onChange={(e) => setFName(e.target.value)} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div style={{ marginBottom: 10 }}>
                <label>Last Name</label>
                <input {...register("lastName")} onChange={(e) => setLName(e.target.value)} />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            <div>
                <label>Age</label>
                <input {...register("age", { valueAsNumber: true })} onChange={(e) => setAge(parseInt(e.target.value))} />
                {errors.age && <p>{errors.age.message}</p>}
            </div>
            <div>
                <label>Website (example: https://www.google.ca)</label>
                <input {...register("website")} onChange={(e) => setWebsite(e.target.value)} />
                {errors.website && <p>{errors.website.message}</p>}
            </div>
            <Reset {...{ reset }} />

            {/* If there are any errors involving the inputting of data, disable the create button. */}
            {errors.firstName || errors.lastName || errors.age || errors.website ?
                <button disabled onClick={() => createUser()}>Create Users in Supabase DB</button>
                :
                <button onClick={() => createUser()}>Create Users in Supabase DB</button>
            }
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {users.map((user) => (
                    <UserCard user={user} />
                ))}
            </div>
        </form>
    );
}