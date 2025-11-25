import "../styles/globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

const openRoutes = ["/splash", "/auth/login", "/auth/signup", "/welcome"];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      const user = session?.user ?? null;

      if (!user && !openRoutes.includes(router.pathname)) {
        router.replace("/auth/login");
        return;
      }

      if (user && ["/auth/login", "/auth/signup"].includes(router.pathname)) {
        router.replace("/home");
        return;
      }

      setChecked(true);
    };

    verify();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => verify());

    return () => subscription.unsubscribe();
  }, [router.pathname]);

  if (!checked) return null;

  return <Component {...pageProps} />;
}
