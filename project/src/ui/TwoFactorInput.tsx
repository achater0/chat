import React, { useRef } from "react";

export default function TwoFactorInput({ code, setCode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const length = 6;

  const handleChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > length) value = value.slice(0, length);

    setCode(value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Backspace" && !code) {
      e.preventDefault();
    }
  };

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="tfa-input" onClick={handleBoxClick}>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="hidden-input"
      />
      <div className="box-wrapper">
        {Array.from({ length }).map((_, i) => (
            <div
            key={i}
            className={`box ${code[i] ? "border-fill" : ""}`}
            >
            {code[i] || "_"}
            </div>
        ))}
      </div>
    </div>
  );
};