import axios from "axios";
import React, { useState } from "react";

const signUpUser = ({ history }) => {
  const [fullName, setFullName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [role, setRole] = useState("");
  //   const [password, setPassword] = useState("");

  const signUpUserHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    // formData.append("email", email);
    // formData.append("role", role);
    // formData.append("password", password);

    await axios.post("/api/user/create", formData);
    history.push("/newUser");
  };
  return (
    <div>
      <h2>SIGN UP </h2>
      <hr />
      <form
        onSubmit={signUpUserHandler}
        method="POST"
        encType="multipart/form-data"
      >
        <form-Group controlId="fullName">
          <form-Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
          />
        </form-Group>
      </form>
    </div>
  );
};

export default signUpUser;
