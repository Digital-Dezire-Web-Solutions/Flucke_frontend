import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export default function Breadcrumb({ items = [] }) {
    if (!items.length) return null;

    return (
        <nav className="rl-breadcrumb" aria-label="Breadcrumb">
            <ol className="rl-breadcrumb__list">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={item.label} className="rl-breadcrumb__item">
                            {item.path && !isLast ? (
                                <Link to={item.path} className="rl-breadcrumb__link">
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className="rl-breadcrumb__current"
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {!isLast && (
                                <span className="rl-breadcrumb__sep" aria-hidden="true">
                                    &gt;
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}