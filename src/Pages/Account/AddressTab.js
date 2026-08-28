import React from "react";
import { PinIcon, EditIcon, TrashIcon, PlusIcon } from "./Icons";
import "./Account.css";

export default function AddressesTab({ addresses, onAdd, onEdit, onDelete, onSetDefault }) {
    return (
        <>
            <div className="rl-addresses-grid">
                {addresses?.map((address) => (
                    <div className="rl-address-card" key={address.id}>
                        <div className="rl-address-card__head">
                            <div className="rl-address-card__title">
                                <h3>{address.name}</h3>
                                {address.isDefault && <span className="rl-pill">Default</span>}
                            </div>
                            <div className="rl-address-card__actions">
                                <button
                                    className="rl-link-btn"
                                    onClick={() => onEdit(address)}
                                >
                                    <EditIcon /> Edit
                                </button>
                                {!address.isDefault && (
                                    <button
                                        className="rl-icon-btn rl-icon-btn--danger"
                                        aria-label={`Delete ${address.label}`}
                                        onClick={() => onDelete(address)}
                                    >
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="rl-address-block">
                            <PinIcon />
                            <div>
                                <strong>{address.name}</strong>
                                <p>
                                    {address.phone}
                                    <br />
                                    {address.area}, {address.city}, {address.state} {address.pincode}
                                    <br />
                                    {address.country}
                                </p>
                            </div>
                        </div>

                        {!address.isDefault && (
                            <button
                                className="rl-btn rl-btn--muted rl-btn--block"
                                onClick={() => onSetDefault(address)}
                            >
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button className="rl-btn rl-btn--dark rl-add-address-btn" onClick={onAdd}>
                Add New Address <PlusIcon />
            </button>
        </>
    );
}