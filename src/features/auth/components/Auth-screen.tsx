"use client"
import React, { useState } from 'react'

import SignInCard from './sign-in-card'
import SignUpCard from './sign-up-card'
import { SignInFlow } from '../Type'

const AuthScreen = () => {
    const [stats, setStats] = useState<SignInFlow>("SignIn")
  return (
    <div className="h-full flex items-center justify-center bg-gray-600">
      <div className="md:h-auto md:w-[420px]">
        {stats === "SignIn" ? <SignInCard setStats={setStats}/> : <SignUpCard setStats={setStats} />}
      </div>
    </div>
  )
}

export default AuthScreen
