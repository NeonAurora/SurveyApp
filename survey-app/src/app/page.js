'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to /survey automatically when the Home component loads
        router.push("/survey");
    }, [router]);

    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "10vh" }}>
                Redirecting to Application...
            </h1>
        </div>
    );
}
