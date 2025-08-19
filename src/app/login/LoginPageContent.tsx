"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPageContent() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already logged in, bounce to post-login
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session) router.replace("/post-login");
    });
    return () => {
      mounted = false;
    };
  }, [router]);

  const msg = params?.get("msg");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message);
      return;
    }

    const uid = data.session?.user.id;
    if (!uid) {
      // Session not present but no error — go to post-login gate
      setLoading(false);
      router.replace("/post-login");
      return;
    }

    // Fetch role to decide destination
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", uid)
      .maybeSingle();

    setLoading(false);

    if (profileErr) {
      // Fallback if profile read fails
      router.replace("/post-login");
      return;
    }

    const role = profile?.role ?? "member";
    router.replace(role === "admin" ? "/admin" : "/member");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card p-6">
        <h1 className="text-2xl font-bold text-white">Log in</h1>

        {msg && <p className="mt-2 text-sm text-brandOrange">{msg}</p>}
        {errorMsg && <p className="mt-2 text-sm text-red-400">{errorMsg}</p>}

        <form onSubmit={onLogin} className="mt-6 grid gap-3">
          <input
            className="input-dark"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            className="input-dark"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-400">
          New here?{" "}
          <Link href="/signup" className="text-brandOrange hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
