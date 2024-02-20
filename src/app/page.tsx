"use client";

import { useSession } from "@clerk/nextjs";

export default function Home() {
  const { session, isSignedIn } = useSession();

  return (
    <main className="">
      <h1>Welcome to PDF Automations 😊</h1>
    </main>
  );
}
