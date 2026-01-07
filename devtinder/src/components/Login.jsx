import axios from "axios";
import {  useState } from "react";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      console.log("Login successful:", res.data);
      // console.log(res.data.user)
      // dispatch(addUser(res.data.user));
      // return navigate("/");
    } catch (err) {
      // setError(err.response.data);
      console.log(err);
    }
  };



  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
           Login
          </h2>
          <div>
          
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center mt-2">
            <button
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;