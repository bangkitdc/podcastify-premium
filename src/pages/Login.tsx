import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import { FormEvent } from "react";
import apiBase from "@/api";
import { useAuth } from "@/contexts";
import BaseInputText from "@/components/shares/inputs/BaseInputText";
import { IApiBaseError } from "@/types/http";
import { useDispatch } from "react-redux";
import { addNotification } from "@/redux/notifications/reducer";

export default function Login() {
  const [username, setUsername] = useInput("");
  const [password, setPassword] = useInput("");

  const apiBaseError = apiBase().error<IApiBaseError>();
  const { login } = useAuth();

  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      if (res.status === "success") {
        dispatch(
          addNotification({
            message: res.message,
            type: "success",
          })
        );
      }
    } catch (error) {
      apiBaseError.set(error);

      dispatch(
        addNotification({
          message: apiBaseError.getMessage(),
          type: "danger",
        })
      );
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        <div className="px-8 py-0 bg-clr-background-base-one">
          <h1 className="text-clr-text-primary text-5xl max-md:text-4xl mt-20 mb-16 max-md:mb-10 mx-0 text-center max-md:text-left">
            Login to Podcastify Creators
          </h1>
          <form
            className="flex flex-col gap-5 w-96 max-md:w-full my-0 mx-auto pb-0"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4">
              <BaseInputText
                id="username"
                label="Username"
                placeholder="Username"
                value={username}
                setValue={setUsername}
                error={apiBaseError.getErrors('username')?.[0]?.toString()}
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
              <div className="mt-6">
                <button className="w-full text-clr-text-black bg-clr-text-info py-4 px-8 rounded-full text-base font-bold">
                  Log in
                </button>
              </div>
            </div>
          </form>
          <hr className="my-12 max-md:my-10 mx-[10%] border-r-0 border-b-0 border-l-0 border-t-2 border-solid border-[#292929]" />
          <div className="text-center mb-14 font-medium max-md:flex max-md:flex-col max-md:gap-2">
            <span className=" text-clr-background-highlight-three">
              Don't have an account?{' '}
            </span>
            <Link
              className=" text-clr-text-primary underline hover:text-clr-text-info-hover"
              to={'/register'}
            >
              Sign up for Podcastify Creators
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
