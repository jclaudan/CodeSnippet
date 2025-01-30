"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Authentification réussie
        </h2>
        <p className="text-black">Redirection en cours...</p>
      </div>
    </div>
  );
}
