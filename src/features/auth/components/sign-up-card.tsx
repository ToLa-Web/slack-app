"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react"
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../Type";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setStats: (stats: SignInFlow) => void;
}
const SignUpCard = ({ setStats }: SignUpCardProps) => {

  const { signIn } = useAuthActions()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password !== confirmPassword){
      setError("Passwords do not match")
      return;
    }
     
    setPending(true);
    signIn("password" , {name, email, password, flow: "signUp"})

    .catch(() => {
      setError("Something went wrong")
    })
    .finally(() => {
      setPending(false)
    })
  }


  const onProviderSignUp = (value: "github" | "google") => {
    setPending(true)
    signIn(value)
    .finally(() => {
      setPending(false)
    })
  }


  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="pt-0 px-0">
        <CardTitle>Sign in to contiue</CardTitle>
        <CardDescription>
          Use your email or another service to login
        </CardDescription>
      </CardHeader>
      {!! error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4"/>
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
          />
          <Input
          type="email"
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Input
            type="password"
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Contiue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.7 left-2.5" />
            Contiue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.7 left-2.5" />
            Contiue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
            Already have an account? <span
            onClick={() => setStats("SignIn")}
            className="text-sky-700 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;

