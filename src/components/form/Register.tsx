import * as React from "react";
import Inputs from "../inputs/Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be more than 2 character")
      .max(32, "First name must be more than 32 character")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
    last_name: z
      .string()
      .min(2, "First name must be more than 2 character")
      .max(32, "First name must be more than 32 character")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character"),
    email: z.string().email("Please Input email"),
    password: z.string().min(6, "6 character").max(12, "12 character"),
    confirm_password: z.string(),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Password doesn't match",
    path: ["confirm_password"],
  });
type FormSchemaType = z.infer<typeof FormSchema>;
interface IRegisterProps {}
// type Inputs = {
//   example: string;
//   exampleRequired: string;
// };
const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const [passwordScore, setPasswordScore] = React.useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => console.log(data);

  const validatePassword = () => {
    let password = watch().password;

    return zxcvbn(password ? password : "").score;
  };
  React.useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  return (
    <>
      <h1>Register form</h1>
      <div className="w-full px-12 py-4">
        <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
          <Inputs
            name="first_name"
            label="First_Name"
            type="text"
            placeholder="First Name"
            register={register}
            error={errors?.first_name?.message}
            disable={isSubmitting}
          />

          <Inputs
            name="last_name"
            label="Last_Name"
            type="text"
            placeholder="Last Name"
            register={register}
            error={errors?.last_name?.message}
            disable={isSubmitting}
          />
          <Inputs
            name="email"
            label="Email"
            type="text"
            placeholder="Email"
            register={register}
            error={errors?.email?.message}
            disable={isSubmitting}
          />
          <Inputs
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
            disable={isSubmitting}
          />
          {watch().password?.length > 0 && (
            <div className="flex mt-2">
              {Array.from(Array(5).keys()).map((item, i) => (
                <span className="w-1/5 px-1" key={i}>
                  <div
                    className={`h-2 ${
                      passwordScore <= 2
                        ? "bg-red-500"
                        : passwordScore < 4
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </span>
              ))}
            </div>
          )}
          <Inputs
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            register={register}
            error={errors?.confirm_password?.message}
            disable={isSubmitting}
          />

          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default Register;
