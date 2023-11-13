import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import apiBase from "@/api";
import { IApiBaseError } from "@/types/http";
import { useAuth } from "@/contexts";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notifications/reducer";

export default function Register() {

  const [email, setEmail] = useInput('');
  const [username, setUsername] = useInput('');
  const [firstName, setFirstName] = useInput('')
  const [lastName, setLastName] = useInput('');
  const [password, setPassword] = useInput('')
  const [confirmPassword, setConfirmPassword] = useInput('')

  const apiBaseError = apiBase().error<IApiBaseError>();
  const { register } = useAuth();

  const dispatch = useDispatch();

  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword && password.length > 0 && confirmPassword.length > 0) {
      setErrorConfirmPassword("Confirm Password don't match Password");
      return;
    } else {
      setErrorConfirmPassword("");
    }

    try {
      await register(
        email,
        username,
        firstName,
        lastName,
        password
      );
    } catch (error) {
      apiBaseError.set(error);

      dispatch(
        addNotification({
          message: apiBaseError.getMessage(),
          type: 'danger',
        }),
      );
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <div className="px-8 py-0 bg-clr-background-base-one">
        <h1 className="text-clr-text-primary text-5xl max-md:text-4xl mt-20 mb-16 max-md:mb-10 mx-0 text-center max-md:text-left">
          Become a Podcastify Creator
        </h1>
        <form
          className="flex flex-col gap-5 w-96 max-md:w-full my-0 mx-auto pb-0"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <BaseInputText
              id="email"
              label="Email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
              error={apiBaseError.getErrors('email')?.[0]?.toString()}
            />

            <BaseInputText
              id="username"
              label="Username"
              placeholder="Username"
              value={username}
              setValue={setUsername}
              error={apiBaseError.getErrors('username')?.[0]?.toString()}
            />

            <BaseInputText
              id="first_name"
              label="First Name"
              placeholder="First Name"
              value={firstName}
              setValue={setFirstName}
              error={apiBaseError.getErrors('first_name')?.[0]?.toString()}
            />

            <BaseInputText
              id="last_name"
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
              error={apiBaseError.getErrors('last_name')?.[0]?.toString()}
            />

            <BaseInputText
              id="password"
              label="Password"
              placeholder="Password"
              type="password"
              value={password}
              setValue={setPassword}
              error={apiBaseError.getErrors('password')?.[0]?.toString()}
            />

            <BaseInputText
              id="confirm-password"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password-no-eye"
              value={confirmPassword}
              setValue={setConfirmPassword}
              error={errorConfirmPassword}
            />

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
        <hr className="my-12 max-md:my-10 mx-[10%] border-r-0 border-b-0 border-l-0 border-t-2 border-solid border-[#292929]" />
        <div className="text-center mb-14 font-medium max-md:flex max-md:flex-col max-md:gap-2">
          <span className=" text-clr-background-highlight-three">
            Already have an account?{' '}
          </span>
          <Link to={'/login'} className=" text-clr-text-primary underline hover:text-clr-text-info-hover">
            Login for Podcastify Creators
          </Link>
        </div>
      </div>
    </div>
  );
}
