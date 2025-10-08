"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For redirecting after sign-in
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useSession, signIn } from "next-auth/react";

function Login() {
  const { data:session,status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading state

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/timesheet");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading ...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value; // or username, depending on your provider
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        redirect: false, // Handle redirect manually
        email, // or username, depending on your authorize function
        password,
      });

      if (result && result.error) {
        console.log("Sign-in error:", result.error);
        setError(result.error || "Invalid email or password");
        setLoading(false);
      } else if (result) {
        router.push("/timesheet"); // Replace with your desired route
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center bg-white px-6 lg:px-12">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
              Welcome back
            </CardTitle>
            
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" id="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 rounded-xl"
                  required
                  
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-11 rounded-xl"
                  required
                
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium rounded-xl bg-blue-700 hover:bg-blue-900 cursor-pointer"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {error && (
                <div className="text-red-500 text-sm font-semibold w-full text-center">
                  {error}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:flex flex-1 flex-col justify-center bg-blue-600 text-white px-10">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">ticktock</h2>
          <p className="text-lg leading-relaxed text-blue-100">
            Introducing{" "}
            <span className="font-semibold text-white">ticktock</span>, our
            cutting-edge timesheet web application designed to revolutionize how
            you manage work hours. With Ticktock, you can effortlessly track and
            manage employee time and productivity from anywhere, anytime, using
            any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;