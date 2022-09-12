import React from "react";
import "./MyForm.css";
import { useState } from "react";

const MyForm = ({ user }) => {
  // 3 - gerenciamento de dados
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [bio, setBio] = useState(user ? user.bio : "");
  const [role, setRole] = useState(user ? user.role : "");

  const handleName = (e) => {
    setName(e.target.value);
  };
  // 6 - controled input
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando o formulario...");
    console.log(name, email, bio, role);

    // 7 - limpar form
    //setName("");
    //setEmail("");
  };
  //console.log(name);
  //console.log(email);

  return (
    <div>
      {/* 1- criacao de form */}
      {/* 5- envio de form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"> Nome: </label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome"
            onChange={handleName}
            value={name}
          />
        </div>
        {/* 2- label envolvendo input */}
        <label>
          <span>E-mail</span>
          {/* 4- gerenciamneto de dados inline*/}
          <input
            type="email"
            placeholder="Digite seu email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        {/* 8- textarea*/}
        <label>
          Bio:
          <textarea
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>
        </label>

        {/* 8- select*/}
        <label>
          <select
            name="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="user"> Usuário</option>
            <option value="editor"> Editor</option>
            <option value="admin"> Administrator</option>
          </select>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};

export default MyForm;
