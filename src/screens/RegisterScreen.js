import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import LoginSuccessComponent from "../components/LoginSuccessComponent";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      registrationFlow().then();
    }
  };

  const sendUserToFirestore = async (user, email) => {
    await setDoc(doc(db, "users", `${email}`), {
      firstName: firstName,
      timestamp: serverTimestamp(),
    });
  };

  const registrationFlow = async () => {
    if (!loading) {
      setLoading(true);
      setSuccess(false);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          sendUserToFirestore(user, user.email)
            .then(() => {
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
            .catch((err) => alert(err));
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="bg-white mt-10 lg:mt-20 lg:py-4 lg:bg-gray-200 w-11/12 lg:w-9/12 mx-auto rounded ">
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
            <h2 className="mt-6 text-center text-2xl lg:text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <button
                type={"button"}
                onClick={() => navigate("/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login here
              </button>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder={"What can we call you.."}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
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
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      onKeyDown={handleKeypress}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={
                      !email ||
                      !firstName ||
                      !password ||
                      password !== confirmPassword
                    }
                    onClick={registrationFlow}
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-25"
                  >
                    Create my account
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

export default RegisterScreen;

// const RegComponent = () => {
//   return (
//     <>
//       <div className="flex flex-col rounded items-center  pt-4">
//         <div className="text-7xl pt-2 text-center">Welcome!</div>
//         <div className="text-5xl pt-2 text-center">Just a few deets</div>
//         <div className="text-5xl pt-2 text-center">is all we need:</div>
//         <div className="p-1.5 m-5 bg-black w-96" />
//         <div className="flex flex-col">
//           <Input
//               className="flex-1 mt-9 bg-white lg:w-72 rounded p-2"
//               type="text"
//               value={firstName}
//               onChange={(event) => setFirstName(event.target.value)}
//               placeholder={"First Name"}
//           />
//           <Input
//               className="flex-1 mt-9 bg-white lg:w-72 rounded p-2"
//               type="email"
//               value={email}
//               onChange={(event) => setEmail(event.target.value)}
//               placeholder={"Email"}
//           />
//           <Input
//               className="flex-1 mt-9 bg-white lg:w-72 rounded p-2"
//               type="password"
//               value={password}
//               onChange={(event) => setPassword(event.target.value)}
//               placeholder={"Password"}
//           />
//           <Input
//               className="flex-1 mt-9 bg-white lg:w-72 rounded p-2"
//               type="password"
//               value={confirmPassword}
//               onChange={(event) => {
//                 setConfirmPassword(event.target.value);
//               }}
//               placeholder={"Confirm Password"}
//               onKeyDown={handleKeypress}
//           />
//           <Button

//               onClick={registrationFlow}
//               sx={{ marginTop: 6 }}
//               variant={"contained"}
//           >
//             Register
//           </Button>
//           <div
//               onClick={() => navigate("/login")}
//               className="text-sm text-center mt-4 hover:cursor-pointer hover:text-blue-600"
//           >
//             Already have an account?
//           </div>
//         </div>
//       </div>
//
//     </>
//   );
// };
