import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import AuthInputText from "../components/shares/inputs/AuthInputText";

export default function Register() {

  const [fullname, setFullname] = useInput('')
  const [username, setUsername] = useInput('')
  const [password, setPassword] = useInput('')
  const [passwordCheck, setPasswordCheck] = useInput('')

  const handleSubmit = () => {
    
  }

  return (
    <div className="px-8 py-0 bg-clr-background-base-one">
      <h1 className="text-clr-text-primary text-5xl my-12 mx-0 text-center">
        Become a Podcastify Creator
      </h1>
      <form className="flex gap-5 flex-col w-4/5 my-0 mx-auto pb-0" onSubmit={handleSubmit}>
        <div>
          <AuthInputText id="register-fullname" inputLabel="Fullname" value={fullname} setValue={setFullname}/>
          <AuthInputText id="register-username" inputLabel="Username" value={username} setValue={setUsername}/>
          <AuthInputText id="register-password" inputLabel="Password" isPassword={true} value={password} setValue={setPassword}/>
          <AuthInputText id="register-confirm-password" inputLabel="Confirm Password" isPassword={true} value={passwordCheck} setValue={setPasswordCheck}/>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full text-clr-text-black bg-clr-text-info py-4 px-8 rounded-full text-base font-bold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <hr className="my-12 mx-[10%] border-r-0 border-b-0 border-l-0 border-t-2 border-solid border-[#292929]" />
      <div className="text-center mt-4 font-medium">
        <span className=" text-clr-background-highlight-three">
          Already have an account?{" "}
        </span>
        <Link to={"/"} className=" text-clr-text-primary underline">
          Login for Podcastify Creators
        </Link>
      </div>
    </div>
  );
}
