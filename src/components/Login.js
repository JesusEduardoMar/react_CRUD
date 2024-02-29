import React, { useState } from "react";
import LogotipoBarbacoa from '../images/LogotipoBarbacoa.jpg'; // Importar la imagen

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="body">
      <section className="main_login">
        <div className="containerLogin">
          <div className="logo_login">
            <img src={LogotipoBarbacoa} alt="Imagen de barbacoa" />
          </div>
          <p className="titulo">Bienvenido</p>
          <form className="form_login" onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fas fa-user"></i>
            </div>
            <div className="inputs">
              <input
                type="password"
                id="password"
                placeholder="Email"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fas fa-lock"></i>
            </div>
            <a href="/reset-password">¿Olvidaste tu contraseña?</a>
            <button type="submit">SIGN IN</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignInForm;