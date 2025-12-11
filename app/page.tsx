"use client";
import Link from "next/link";
import { useState } from "react";
import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default function Home() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="max-w-3xl text-center">
        {/* MAIN HEADING */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Understand naturally,
          <br />
          Speed comes automatically!
        </h1>

        {/* TAGLINE */}
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Find your missing lesson and fix your concept gap.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">

          <Link href="/explorer">
            <button className="px-9 py-3 bg-green-600 text-white rounded-2xl shadow-md hover:shadow-xl hover:bg-green-700 transition-all">
              Explorer
            </button>
          </Link>

          <button onClick={() => { !session?.user && setOpen(true) }} className="px-9 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:shadow-xl hover:bg-blue-700 transition-all">
            Test Yourself
          </button>

          <button className="px-9 py-3 bg-purple-600 text-white rounded-2xl shadow-md hover:shadow-xl hover:bg-purple-700 transition-all">
            Result & Certificate
          </button>

          <Button className={session?.user ? "" : "hidden"} onClick={() => signOut()}>Logout</Button>
        </div>
      </div>

      <LoginDialog open={open} setOpen={setOpen} />

      {/* MISSION SECTION */}
      <div className="max-w-4xl text-center mt-24 px-3">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed mb-3">
          We provide foundational lessons for <b>Urdu, Math, English
            language, and Arabic language</b> to prepare learners for self-study and onward <b>knowledge</b> journey.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          This platform supports <b>Foundation,</b> PCTB, Cambridge system and Madrasa educational curriculum, giving
          students a flexible and personalized choice learning experience.</p>
      </div>
    </div>
  );
}
