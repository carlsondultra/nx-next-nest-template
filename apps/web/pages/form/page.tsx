import React from "react";
import ReactDOM from "react-dom";
import { useForm, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Reset from "./reset";

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Example Form</h1>
        <label>First Name</label>
        <input {...register("firstName")} />
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
    </form>
  );
}