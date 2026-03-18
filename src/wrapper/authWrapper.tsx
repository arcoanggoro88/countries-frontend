import type React from "react";
import AuthHero from "../assets/hero.jpg";
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden h-[90vh]">
        <div className="hidden md:block md:w-1/2 relative   ">
          <img
            src={AuthHero}
            alt="Auth Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>
        {children}
      </div>
    </section>
  );
};

export default AuthWrapper;
