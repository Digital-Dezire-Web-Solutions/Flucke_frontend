import React, { useState } from "react";
import Toggle from "./Toggle.js";
import { EyeIcon } from "./Icons";
import "./Account.css";

function PasswordField({ label, name, placeholder }) {
    const [visible, setVisible] = useState(false);
    return (
        <label className="rl-field">
            <span>{label}</span>
            <div className="rl-password-wrap">
                <input
                    type={visible ? "text" : "password"}
                    name={name}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    className="rl-icon-btn"
                    aria-label={visible ? "Hide password" : "Show password"}
                    onClick={() => setVisible((v) => !v)}
                >
                    <EyeIcon off={visible} />
                </button>
            </div>
        </label>
    );
}

export default function SettingsTab({ user, onSaveProfile, onUpdatePassword, onDeleteAccount }) {
    const [profile, setProfile] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
    });
    const [privacy, setPrivacy] = useState({
        twoFactor: false,
        loginAlerts: true,
        saveLoginInfo: true,
    });
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        onSaveProfile?.(profile);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        onUpdatePassword?.({
            currentPassword: form.get("currentPassword"),
            newPassword: form.get("newPassword"),
            confirmPassword: form.get("confirmPassword"),
        });
        e.target.reset();
    };

    return (
        <>
            <div className="rl-settings-grid">
                <div className="rl-settings-heading">
                    <h2>Personal Information</h2>
                    <p>Update your personal details</p>
                </div>
                <form className="rl-card" onSubmit={handleProfileSubmit}>
                        <label className="rl-field">
                            <span>Full Name</span>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                            />
                        </label>
                    <div className="rl-field-row">
                        {/* <label className="rl-field">
                            <span>Last name</span>
                            <input
                                type="text"
                                value={profile.lastName}
                                onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                            />
                        </label> */}
                    </div>
                    <label className="rl-field">
                        <span>Your email</span>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        />
                    </label>
                    <label className="rl-field">
                        <span>Phone number</span>
                        <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                        />
                    </label>
                    <div className="rl-form-footer">
                        <button type="submit" className="rl-btn rl-btn--dark">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="rl-settings-grid">
                <div className="rl-settings-heading">
                    <h2>Change Password</h2>
                    <p>Update your account password</p>
                </div>
                <form className="rl-card" onSubmit={handlePasswordSubmit}>
                    <PasswordField
                        label="Current Password"
                        name="currentPassword"
                        placeholder="Enter current password"
                    />
                    <PasswordField
                        label="New Password"
                        name="newPassword"
                        placeholder="Enter new password"
                    />
                    <PasswordField
                        label="Confirm New Password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                    />
                    <div className="rl-form-footer">
                        <button type="submit" className="rl-btn rl-btn--dark">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>

            {/* <div className="rl-settings-grid">
                <div className="rl-settings-heading">
                    <h2>Privacy &amp; Security</h2>
                    <p>Manage your privacy settings</p>
                </div>
                <div className="rl-card">
                    <div className="rl-toggle-row">
                        <div>
                            <strong>Two-Factor Authentication</strong>
                            <span>Add an extra layer of security</span>
                        </div>
                        <Toggle
                            checked={privacy.twoFactor}
                            onChange={(v) => setPrivacy((p) => ({ ...p, twoFactor: v }))}
                            label="Two-Factor Authentication"
                        />
                    </div>
                    <div className="rl-toggle-row">
                        <div>
                            <strong>Login Alerts</strong>
                            <span>Get notified of new login attempts</span>
                        </div>
                        <Toggle
                            checked={privacy.loginAlerts}
                            onChange={(v) => setPrivacy((p) => ({ ...p, loginAlerts: v }))}
                            label="Login Alerts"
                        />
                    </div>
                    <div className="rl-toggle-row">
                        <div>
                            <strong>Save Login Info</strong>
                            <span>Stay logged in on this device</span>
                        </div>
                        <Toggle
                            checked={privacy.saveLoginInfo}
                            onChange={(v) => setPrivacy((p) => ({ ...p, saveLoginInfo: v }))}
                            label="Save Login Info"
                        />
                    </div>
                </div>
            </div> */}

            <div className="rl-settings-grid">
                <div className="rl-settings-heading rl-settings-heading--danger">
                    <h2>Delete Account</h2>
                    <p>Permanently delete your account &amp; all data</p>
                </div>
                <div className="rl-danger-box">
                    <p>
                        *Once you delete your account, there is no going back. All your
                        data, orders, and preferences will be permanently removed.
                    </p>
                    {confirmingDelete ? (
                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                className="rl-btn rl-btn--danger"
                                onClick={() => onDeleteAccount?.()}
                            >
                                Yes, Delete My Account
                            </button>
                            <button
                                className="rl-btn rl-btn--ghost"
                                onClick={() => setConfirmingDelete(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            className="rl-btn rl-btn--danger"
                            onClick={() => setConfirmingDelete(true)}
                        >
                            Delete My Account
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}