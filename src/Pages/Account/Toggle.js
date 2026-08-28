import React from "react";
import "./Account.css";

export default function Toggle({ checked, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className={`rl-toggle ${checked ? "rl-toggle--on" : ""}`}
            onClick={() => onChange(!checked)}
        >
            <span className="rl-toggle__knob" />
        </button>
    );
}