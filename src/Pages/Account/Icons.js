import React from "react";

export function DashboardIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="11" y="11" width="6.5" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function BoxIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M2.5 6.2 10 2.5l7.5 3.7v7.6L10 17.5l-7.5-3.7V6.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2.7 6.2 10 9.9l7.3-3.7M10 9.9v7.6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

export function HeartIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 19 19" fill="none" {...props}>
            <path
                d="M9.5 16.3s-6.8-4.1-6.8-9.1a3.9 3.9 0 0 1 6.8-2.6 3.9 3.9 0 0 1 6.8 2.6c0 5-6.8 9.1-6.8 9.1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function PinIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M10 18s6-5.6 6-10.4a6 6 0 0 0-12 0C4 12.4 10 18 10 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <circle cx="10" cy="7.6" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function CardIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <rect x="2" y="4.5" width="16" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 8.2h16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function SlidersIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M3 5h9M15.5 5h1.5M3 10h5M11.5 10H17M3 15h9M15.5 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12.5" cy="5" r="1.7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="10" r="1.7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12.5" cy="15" r="1.7" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function LogoutIcon(props) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M8 17.5H4.2A1.2 1.2 0 0 1 3 16.3V3.7A1.2 1.2 0 0 1 4.2 2.5H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 14l4.5-4-4.5-4M17.3 10H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function ChevronIcon(props) {
    return (
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M7.5 4.5 13 10l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function EditIcon(props) {
    return (
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M13.7 3.3a1.7 1.7 0 0 1 2.4 2.4L6.6 15.2l-3.3.9.9-3.3 9.5-9.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function TrashIcon(props) {
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M3.5 5.5h13M8 5.5V3.8a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.7M6 5.5v10a1.3 1.3 0 0 0 1.3 1.3h5.4A1.3 1.3 0 0 0 14 15.5v-10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function PlusIcon(props) {
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M10 3.5v13M3.5 10h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}

export function EyeIcon({ off, ...props }) {
    return (
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" {...props}>
            <path
                d="M1.5 10S4.7 3.5 10 3.5 18.5 10 18.5 10 15.3 16.5 10 16.5 1.5 10 1.5 10Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
            />
            <circle cx="10" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.4" />
            {off && <line x1="2.5" y1="17.5" x2="17.5" y2="2.5" stroke="currentColor" strokeWidth="1.4" />}
        </svg>
    );
}

export function DownloadIcon(props) {
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M10 3v9.5M6.3 9 10 12.7 13.7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 15.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ViewIcon(props) {
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" {...props}>
            <path d="M1.5 10S4.7 4.5 10 4.5 18.5 10 18.5 10 15.3 15.5 10 15.5 1.5 10 1.5 10Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
    );
}