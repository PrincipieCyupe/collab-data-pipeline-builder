import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleForm = () => {
    setError(null);
    setIsLogin(!isLogin);
    setUser("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: user });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>{`
        body{
          margin: 0;
          padding: 0;
          min-height:100vh;
          font-family: sans-serif;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        }
        .hero{
          min-height:100vh;
          width : 100%;
          background:#1b1b1b;
          position: absolute;
        }
        div{
          box-sizing: border-box;
        }
        /*main box*/
        .main-box{
          width: 320px;
          height: 480px;
          position: relative;
          margin: 6% auto;
          background:#1b1b1b;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .sp{
          position: absolute;
          transition: 0.5s;
        }
        .sp-t{
          top: 0;
          right: 0;
          width: 200px;
          height: 2px;
          background:linear-gradient( to left , transparent,#57AAB4,#57AAB4);
          animation: anim2 2s linear infinite;
          transform: translateY(-300%);
          animation-delay: 0.8s;
        }
        .sp-r{
          bottom: 0;
          right: 0;
          width: 2px;
          height: 200px;
          background:linear-gradient( to top , transparent,#57AAB4 ,#57AAB4);
          animation: anim1 2s linear infinite;
          animation-delay: 0s;
        }
        .sp-b{
          right: 0;
          bottom: 0;
          width: 200px;
          height: 2px;
          background:linear-gradient( to left , transparent,#57AAB4,#57AAB4);
          animation: anim2 2s linear infinite;
        }
        .sp-l{
          left: 0;
          top:0;
          width: 2px;
          height: 200px;
          background:linear-gradient( to top , transparent,#57AAB4,#57AAB4);
          animation: anim1 2s linear infinite;
          animation-delay: 1s;
          transform: translateX(-300%);
        }
        @keyframes anim1 {
            0%{
                transform: translateY(300%);
            }
            100%{
                transform: translateY(-300%);
            }
        }
        @keyframes anim2 {
            0%{
                transform: translateX(300%);
            }
            100%{
                transform: translateX(-300%);
            }
        }
        /*main box end*/

        .form-box{
          width: 316px;
          height: 476px;
          position: relative;
          background:#252525;
          padding: 5px;
          overflow: hidden;
          z-index: 5;
        }
        #after{
          width: 50%;
          height: 100%;
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          background:#2d2e30;
          z-index:-1;
          transition: 0.5s;
        }
        .button-box{
          width: 220px;
          margin: 35px auto 30px auto;
          position: relative;
          border-radius:30px;
          display: flex;
          justify-content: space-around;
          animation: animBTN 5s linear infinite;
        }

        @keyframes animBTN {
            0%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
            33%{
                box-shadow:  0 0 10px 9px rgba(244,65,165,0.3);
            }
            66.9%{
                box-shadow:  0 0 10px 9px rgba(255,235,59,0.3);
            }
            100%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
        }
        .toggle-btn{
          padding: 10px 30px;
          cursor: pointer;
          background:transparent;
          border: 0;
          font-size: 14px;
          font-weight: bold;
          color: rgb(234, 234, 235);
          outline: none;
          position: relative;
          transition: 0.5s;
        }
        #btn{
          position: absolute;
          top: 0;
          left: 0;
          width: 110px;
          height: 100%;
          background:linear-gradient( to left , #57AAB4,#57AAB4);
          border-radius: 30px;
          transition: 0.5s;
        }
        .social-icons{
          margin: 0 auto;
          text-align: center;
          display: flex;
          justify-content: center;
        }
        .icon-link{
          display: flex;
          background: transparent;
          width: 50px;
          height: 50px;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border-radius: 50%;
          margin: 0px 10px;
          box-shadow: 6px 6px 10px -1px rgba(234, 234, 235, 0.1),
                -6px -6px 10px -1px rgba(37,37,37,0.7);
          border: 1px solid rgba(234, 234, 235,0.09);
          transition: transform 0.5s;
        }
        .cont-icon{
          color: #57AAB4;
          font-size: 28px;
          transition: transform 0.5s;
        }
        .icon-link:hover{
          box-shadow: inset 4px 4px 6px -1px rgba(234, 234, 235, 0.2),
                inset 4px 4px 6px -1px rgba(37,37,37,0.7),
                0 0 5px #57AAB4,
                0 0 25px #57AAB4,
                0 0 50px #57AAB4,
                0 0 100px #03e9f4;
          transform: translateY(2px);
        }
        .icon-link:hover .cont-icon{
          transform: scale(0.95);
        }
        .icon-link:hover .fa-facebook{
          color: #57AAB4;
        }
        .icon-link:hover .fa-instagram{
          color: #57AAB4;
        }
        .icon-link:hover .fa-github{
          color: #57AAB4;
        }
        .input-group{
          width: 320px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          top:180px;
          position: absolute;
          padding:0 30px;
          transition: 0.5s;
          box-sizing: border-box;
        }
        .input-field{
          width: 100%;
          padding: 10px 5px;
          margin: 10px 0;
          border-top: 0;
          border-left: 2px solid #57AAB4;
          border-right:0;
          border-bottom: 2px solid #57AAB4;
          outline: none;
          background: transparent;
          color: rgb(234, 234, 235);
          font-size: 15px;
          transition: 0.5s;
        }
        .input-field:focus{
          border-left: 2px solid transparent;
          border-bottom: 2px solid transparent;
          animation: animINP 5s linear infinite, animBTN 5s linear infinite;
        }
        .submit-btn{
          width: 85%;
          padding: 10px 30px;
          cursor: pointer;
          display: block;
          margin: 30px auto 0 auto;
          background: linear-gradient(to right, #03a9f4,#57AAB4,#03a9f4);
          border:0;
          outline: none;
          border-radius: 30px;
          position: relative;
          z-index: 5;
          box-sizing: border-box;
          color:#fff;
          font-weight: bold;
          font-size:15px;
          transition: 0.5s;
        }
        .submit-btn:hover {
          background:#57AAB4;
          color: #fff;
          border-radius: 30px;
          box-shadow: 0 0 5px #57AAB4,
                      0 0 25px #57AAB4,
                      0 0 50px #57AAB4,
                      0 0 100px #03e9f4;
        }
        .span{
          margin: 20px 0;
          color:rgb(234, 234, 235);
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .check-box{
          margin: 0 10px ;
          padding: 0;
        }
        #login{
          left : 0px;
        }
        #register{
          left : 500px;
        }
        @keyframes animBTN {
            0%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
            33%{
                box-shadow:  0 0 10px 9px rgba(244,65,165,0.3);
            }
            66.9%{
                box-shadow:  0 0 10px 9px rgba(255,235,59,0.3);
            }
            100%{
                box-shadow:  0 0 10px 9px rgba(3,169,244,0.3);
            }
        }
      `}</style>

      <div className="hero">
        <div className="main-box">
          <div className="form-box">
            <div id="after" style={{ left: isLogin ? "50%" : "0", top: 0 }}></div>

            <div className="button-box">
              <div id="btn" style={{ left: isLogin ? "0" : "110px" }}></div>
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(true)}
                style={{ color: isLogin ? "#252525" : "rgb(234, 234, 235)" }}
              >
                Log in
              </button>
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(false)}
                style={{ color: isLogin ? "rgb(234, 234, 235)" : "#252525" }}
              >
                Register
              </button>
            </div>

            <div className="social-icons">
              <a className="icon-link" href="#"><i className="fab fa-facebook cont-icon"></i></a>
              <a className="icon-link" href="#"><i className="fab fa-instagram cont-icon"></i></a>
              <a className="icon-link" href="#"><i className="fab fa-github cont-icon"></i></a>
            </div>

            {error && (
              <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
                {error}
              </p>
            )}

            {/* Login Form */}
            <form
              onSubmit={handleSubmit}
              className="input-group"
              style={{
                left: isLogin ? "0px" : "-500px",
                position: "absolute",
                width: "320px",
              }}
            >
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" className="submit-btn" value="Log in" />
            </form>

            {/* Register Form */}
            <form
              onSubmit={handleSubmit}
              className="input-group"
              style={{
                left: isLogin ? "500px" : "0px",
                position: "absolute",
                width: "320px",
              }}
            >
              <input
                type="text"
                className="input-field"
                placeholder="User"
                required
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input-field"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" className="submit-btn" value="Register" />
            </form>
          </div>

          <span className="sp sp-t"></span>
          <span className="sp sp-r"></span>
          <span className="sp sp-b"></span>
          <span className="sp sp-l"></span>
        </div>
      </div>
    </>
  );
};

export default AuthForm;

