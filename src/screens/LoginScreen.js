import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import LoadingScreen from "./LoadingScreen";
import LoginSuccessComponent from "../components/LoginSuccessComponent";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      loginFlow().then();
    }
  };

  const loginFlow = async () => {
    if (!loading) {
      setLoading(true);
      setSuccess(false);
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          console.log(user);
          wait(600)
            .then(() => {
              setSuccess(true);
              setLoading(false);
            })
            .then(() =>
              wait(3000).then(() => {
                setLoading(false);
                setSuccess(false);
              })
            )
            .then(() => navigate("/", { replace: true }));
        })
        .catch((err) => alert(err))
        .then(() => navigate("/", { replace: true }));
    }
  };

  return (
    <div className="flex flex-col lg:pb-56  bg-gray-200 mx-96 rounded items-center  pt-4">
      {loading ? (
        <LoadingScreen />
      ) : success ? (
        <LoginSuccessComponent />
      ) : (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                type={"button"}
                onClick={() => navigate("/register")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register here
              </button>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onKeyDown={handleKeypress}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <button
                      type={"button"}
                      onClick={() => alert("Functionality in progress.")}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <div>
                  <button
                    disabled={!email || !password}
                    onClick={loginFlow}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-25"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
