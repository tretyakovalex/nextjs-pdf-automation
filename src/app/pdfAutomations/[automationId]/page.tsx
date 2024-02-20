"use client"

import { useSession } from "@/lib/utils";

export default function CreateAutomation() {

    const { isAuthenticated } = useSession();

    return (
        <main>
            Your PDF was successfully uploaded!
        </main>
    );
}