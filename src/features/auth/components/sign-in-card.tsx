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

interface SignInCardProps {
  setStats: (stats: SignInFlow) => void;
}
const SignInCard = ({ setStats }: SignInCardProps) => {
  const { signIn } = useAuthActions()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  
  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPending(true)
    signIn("password" , { email, password, flow: "signIn"})

    .catch(() => {
      setError("Invalid email or passowrd")
    })
    .finally(() => {
      setPending(false)
    })
  } 

  const onProviderSignIn = (value: "github" | "google") => {
    setPending(true)
    signIn(value)
    .finally(() => {
      setPending(false)
    })
  }
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="pt-0 px-0">
        <CardTitle>Login to contiue</CardTitle>
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
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
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
          <Button type="submit" className="w-full" size="lg" disabled={false}>
            Contiue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5 absolute top-2.7 left-2.5" />
            Contiue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5 absolute top-2.7 left-2.5" />
            Contiue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Dont have an account? <span
              onClick={() => setStats("SignUp")}
              className="text-sky-700 cursor-pointer hover:underline">
              Sign up
            </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
