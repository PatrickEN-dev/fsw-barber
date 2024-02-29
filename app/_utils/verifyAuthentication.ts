import { signIn } from "next-auth/react";

interface IVerifyToSignIn<T> {
  value: T;
  signInValue: string;
}

const verifyToSignIn = <T>({ value, signInValue }: IVerifyToSignIn<T>) =>
  !value && signIn(`${signInValue}`);

export default verifyToSignIn;
