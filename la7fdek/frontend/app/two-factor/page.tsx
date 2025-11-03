'use client';
import { useRouter } from "next/navigation"
import Title from "../ui/Title";
import "./two-factor.css";
import TwoFactorInput from "./components/TwoFactorInput";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TwoFactor() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/two-factor",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        router.push("/home");
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(`2FA failed: ${error}`);
    }
  };

  return (
    <div className="container">
      <Title />
      <div className="tfa border">
        <div className="lock">
          <img src="/assets/lock.svg" alt="" />
        </div>
        <p>Enter 6-digit code from your two factor authenticator request</p>
        <form className="tfa-form">
          <TwoFactorInput code={code} setCode={setCode} />
          <button
            type="submit"
            disabled={code.length !== 6}
            onClick={handleSubmit}
            className={code.length !== 6 ? "disabled" : ""}
          >
            {6 - code.length === 0
              ? "Submit"
              : `${6 - code.length} digits left`}
          </button>
        </form>
      </div>
    </div>
  );
}
