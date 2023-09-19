import { useState, useContext } from "react";
import Image from "next/image";
import {Label, Input, Button, WindmillContext} from "@roketid/windmill-react-ui";
import { useRouter } from "next/router";

interface VerificationFormProps {
  name?: string;
  email?: string;
  password?: string;
}

const VerifyEmail = (props: VerificationFormProps) => {
  const [code, setCode] = useState("");
  const { mode } = useContext(WindmillContext);
  const router = useRouter();
  const imgSource =
    mode === "dark"
      ? "/assets/img/login-office-dark.jpeg"
      : "/assets/img/login-office.jpeg";
  const endpoint = process.env.BACKEND_ADDRESS + "/auth/login/manual";
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let data = {
      name: props.name,
      email: props.email,
      password: props.password,
      code: code,
    };
    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);

    if (result.token) {
      localStorage.setItem('token', result.token);
      router.push("/dashboard");
      alert("verification successful");
    } else {
      alert("verification failed. Please try again");
    }
  };

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
                <span>Verification Code:</span>
                <Input
                  className="mt-1"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Label>
              <Button className="mt-4" onClick={handleSubmit} block>
                Submit
              </Button>            
        
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
