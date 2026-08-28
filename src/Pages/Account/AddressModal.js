import React, { useEffect, useRef, useState } from "react";
import "./Account.css";

const EMPTY = {
  name: "",
  phone: "",
  house: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

/**
 * AddressModal
 * Pass `address` to edit an existing one (prefills + shows "Save Changes"),
 * or leave it null to add a new one ("Add Address").
 * onSave receives the form values; onClose just dismisses the modal.
 */
export default function AddressModal({ isOpen, address, onClose, onSave }) {
  const [values, setValues] = useState(EMPTY);
  const firstFieldRef = useRef(null);
  const isEditing = Boolean(address);

  useEffect(() => {
    if (isOpen) {
      setValues(address ? { ...EMPTY, ...address } : EMPTY);
      const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, address]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(values);
  };

  return (
    <div
      className="rl-modal__backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="rl-modal" role="dialog" aria-modal="true">
        <button
          className="rl-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="rl-modal__title">
          {isEditing ? "Edit Address" : "Add New Address"}
        </h2>

        <form className="rl-modal__form" onSubmit={handleSubmit}>
          <label className="rl-field">
            <span>Address label*</span>
            <input
              ref={firstFieldRef}
              type="text"
              placeholder="e.g. Home, Office"
              value={values.label}
              onChange={update("label")}
              required
            />
          </label>

          <label className="rl-field">
            <span>Full name*</span>
            <input
              type="text"
              placeholder="Recipient's full name"
              value={values.name}
              onChange={update("name")}
              required
            />
          </label>

          <label className="rl-field">
            <span>Phone number*</span>
            <input
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={values.phone}
              onChange={update("phone")}
              required
            />
          </label>

          <label className="rl-field">
            <span>Street address*</span>
            <input
              type="text"
              placeholder="123 Beauty Lane, Suite 100"
              value={values.area}
              onChange={update("area")}
              required
            />
          </label>

          <div className="rl-field-row">
            <label className="rl-field">
              <span>City*</span>
              <input
                type="text"
                value={values.city}
                onChange={update("city")}
                required
              />
            </label>
            <label className="rl-field">
              <span>State*</span>
              <input
                type="text"
                value={values.state}
                onChange={update("state")}
                required
              />
            </label>
          </div>

          <div className="rl-field-row">
            <label className="rl-field">
              <span>ZIP / Postal code*</span>
              <input
                type="text"
                value={values.pincode}
                onChange={update("pincode")}
                required
              />
            </label>
            <label className="rl-field">
              <span>Country*</span>
              <input
                type="text"
                value={values.country}
                onChange={update("country")}
                required
              />
            </label>
          </div>

          <label className="rl-modal__check">
            <input
              type="checkbox"
              checked={values.isDefault}
              onChange={(e) =>
                setValues((v) => ({ ...v, isDefault: e.target.checked }))
              }
            />
            <span>Set as default address</span>
          </label>

          <div className="rl-modal__actions">
            <button
              type="button"
              className="rl-btn rl-btn--ghost"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="rl-btn rl-btn--dark">
              {isEditing ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
