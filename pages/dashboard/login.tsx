import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGoogleLogin } from "@react-oauth/google";
import dotenv from "dotenv";
import {
  Label,
  Input,
  Button,
  WindmillContext,
} from "@roketid/windmill-react-ui";
import { GoogleIcon } from "icons";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import axios from "axios";
import { post } from './../../utils/utilities';


dotenv.config();

interface LoginPageProps {
  path?: string;
}

const fetch = async (
  tokenData: any,
  flag: string,
  token: any
): Promise<boolean> => {
  console.log(process.env.BACKEND_ADDRESS);
  let data =
    flag === "google"
      ? {
          token: tokenData,
        }
      : tokenData;
  let bearerToken =
    flag === "google" ? tokenData.access_token ?? "" : token ?? "";
  const url =
    flag === "google"
      ? process.env.BACKEND_ADDRESS + "/auth/login/"
      : process.env.BACKEND_ADDRESS + "/auth/login/manual";
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "application/JSON",
      Authorization: `Bearer ${bearerToken}`,
    },
    data: JSON.stringify(data),
  };
  return new Promise<boolean>((resolve, reject) => {
    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("token", response.data.token??null);
        console.log(response, response.data);
        resolve(true);
      })
      .catch((error) => {
        console.log(error);
        reject(false);
      });
  })
};

const LoginPage = (props: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, logout } = useContext(AuthContext);
  const { mode } = useContext(WindmillContext);
  const router = useRouter();
  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      console.log(
        "tokenresponse=====",
        tokenResponse,
        JSON.parse(tokenResponse)
      );
      await fetch(JSON.parse(tokenResponse), "google", "");
      if (props) {
        console.log(props);
      }
      router.push("/");
      localStorage.setItem("token", JSON.stringify(tokenResponse));
    },
    onError: (err) => {
      console.log(err);
    },
  }); 

  // manual login
  const manualLogin = async () => {
    const data = {
      email: email,
      name: email,
      password: password,
    };
    const token = localStorage.getItem('token');
    const state = await fetch(data, "manual", token);
    console.log('verifyState',state);
    router.push("/dashboard/verify-email");
    // setVerifyState(state);      
    // .then((res)=>console.log(res.data));
  };
  // useEffect(() => {

  // },[verifyState]) 
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="relative h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="hidden object-cover w-full h-full"
              src={imgSource}
              alt="Office"
              layout="fill"
            />
          </div>

          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  value={email}
                  placeholder="john@doe.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***************"
                />
              </Label>
              <Link href="/dashboard" passHref={true}>
                <Button className="mt-4" onClick={() => manualLogin()} block>
                  Log in
                </Button>
              </Link>
              <hr className="my-8" />
              <Button block layout="outline" onClick={() => googleLogin()}>
                <GoogleIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Sign in with Google
              </Button>
              <p className="mt-4">
                <Link href="/dashboard/forgot-password">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Forgot your password?
                  </a>
                </Link>
              </p>
              <p className="mt-1">
                <Link href="/dashboard/create-account">
                  <a className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
                    Create account
                  </a>
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
