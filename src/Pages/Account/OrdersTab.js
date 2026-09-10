import React, { useState } from "react";
import { DownloadIcon, ViewIcon } from "./Icons";
import "./Account.css";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../../Assets/Logo/logo.jpg";

function StatusBadge({ status }) {
  const map = {
    shipping: "rl-badge--shipping",
    delivered: "rl-badge--delivered",
    cancelled: "rl-badge--cancelled",
    processing: "rl-badge--processing",
  };
  return (
    <span className={`rl-badge ${map[status] || "rl-badge--processing"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// Fetches a bundled/static asset and converts it to a base64 data URL, which
// is the format jsPDF's addImage() needs — it can't take a plain file path.
function getImageDataUrl(src) {
  return fetch(src)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
}

const INK = [26, 23, 18];
const INK_SOFT = [60, 56, 48];
const MUTED = [130, 124, 112];

async function downloadInvoice(order, user, logoSrc) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;
  const rightEdge = pageWidth - marginX;
  let y = 20;

  // --- Logo (best-effort — invoice still generates fine without it) ---
  let logoHeight = 0;
  if (logoSrc) {
    try {
      const dataUrl = await getImageDataUrl(logoSrc);
      const props = doc.getImageProperties(dataUrl);
      const logoWidth = 24;
      logoHeight = (props.height * logoWidth) / props.width;
      doc.addImage(dataUrl, props.fileType, marginX, y, logoWidth, logoHeight);
    } catch (err) {
      console.warn("Invoice logo could not be loaded:", err);
    }
  }

  const brandX = logoHeight ? marginX + 30 : marginX;

  // --- Header: brand (left) + invoice meta (right) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...INK);
  doc.text("FLUCKE", brandX, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("LUXURY SKINCARE", brandX, y + 14);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...INK);
  doc.text("INVOICE", rightEdge, y + 6, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...MUTED);
  doc.text(`Order: ${order.id}`, rightEdge, y + 13, { align: "right" });
  doc.text(`Date: ${order.date}`, rightEdge, y + 19, { align: "right" });

  y += Math.max(logoHeight, 22) + 10;
  doc.setDrawColor(225);
  doc.line(marginX, y, rightEdge, y);
  y += 14;

  // --- Billed To / Order Info, two columns ---
  const col2X = marginX + 100;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...INK);
  doc.text("Billed To", marginX, y);
  doc.text("Order Info", col2X, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK_SOFT);

  let leftY = y + 5;
  doc.text(user.name || "-", marginX, leftY);
  leftY += 5.5;
  if (user.email) {
    doc.text(user.email, marginX, leftY);
    leftY += 5.5;
  }
  if (user.phone) {
    doc.text(user.phone, marginX, leftY);
    leftY += 5.5;
  }

  // Shipping address, stacked under "Billed To" — only rendered when the
  // order actually carries one.
  if (order.shippingAddress) {
    const addr = order.shippingAddress;
    leftY += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...INK);
    doc.text("Shipping Address", marginX, leftY);
    leftY += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK_SOFT);

    if (addr.fullName) {
      doc.text(addr.fullName, marginX, leftY);
      leftY += 5.5;
    }
    if (addr.house || addr.area) {
      doc.text(
        [addr.house, addr.area].filter(Boolean).join(", "),
        marginX,
        leftY,
        { maxWidth: col2X - marginX - 10 },
      );
      leftY += 5.5;
    }
    if (addr.city || addr.state) {
      doc.text(
        [addr.city, addr.state].filter(Boolean).join(", "),
        marginX,
        leftY,
      );
      leftY += 5.5;
    }
    if (addr.country || addr.pincode) {
      doc.text(
        [addr.country, addr.pincode].filter(Boolean).join(" - "),
        marginX,
        leftY,
      );
      leftY += 5.5;
    }
    if (addr.phone) {
      doc.text(addr.phone, marginX, leftY);
      leftY += 5.5;
    }
  }

  let rightY = y + 5;
  doc.text(`Status: ${order.status}`, col2X, rightY);
  rightY += 5.5;
  if (order.paymentMethod) {
    doc.text(`Payment: ${order.paymentMethod}`, col2X, rightY);
    rightY += 5.5;
  }
  if (order.orderNote) {
    doc.text(`Note: ${order.orderNote}`, col2X, rightY, {
      maxWidth: rightEdge - col2X,
    });
    rightY += 5.5;
  }

  y = Math.max(leftY, rightY) + 10;

  // --- Items table ---
  autoTable(doc, {
    startY: y,
    head: [["#", "Item", "Qty", "Price", "Amount"]],
    body: order.items.map((item, i) => [
      i + 1,
      item.name,
      item.qty,
      `Rs. ${item.price.toFixed(2)}`,
      `Rs. ${(item.price * item.qty).toFixed(2)}`,
    ]),
    theme: "grid",
    margin: { left: marginX, right: marginX },
    styles: {
      fontSize: 9.5,
      cellPadding: 6,
      textColor: INK_SOFT,
      lineColor: [225, 225, 225],
    },
    headStyles: {
      fillColor: INK,
      textColor: 255,
      fontStyle: "bold",
      fontSize: 9.5,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" },
      2: { cellWidth: 20, halign: "center" },
      3: { cellWidth: 32, halign: "right" },
      4: { cellWidth: 32, halign: "right" },
    },
    didDrawPage: (data) => {
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text(
        `Page ${data.pageNumber}`,
        pageWidth - marginX,
        doc.internal.pageSize.getHeight() - 10,
        { align: "right" },
      );
    },
  });

  y = doc.lastAutoTable.finalY + 12;

  // --- Totals ---
  // Subtotal/Discount/Shipping always show, defaulting to 0 when the order
  // doesn't carry that field — rather than hiding the breakdown entirely.
  const subtotal = order.subtotal ?? order.total;
  const discount = order.discount ?? 0;
  const shippingCharge = order.shippingCharge ?? 0;

  doc.setDrawColor(225);
  doc.line(col2X, y, rightEdge, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK_SOFT);

  doc.text("Subtotal", col2X, y);
  doc.text(`Rs. ${subtotal.toFixed(2)}`, rightEdge, y, { align: "right" });
  y += 6;

  doc.text("Discount", col2X, y);
  doc.text(
    discount > 0 ? `- Rs. ${discount.toFixed(2)}` : "Rs. 0.00",
    rightEdge,
    y,
    { align: "right" },
  );
  y += 6;

  doc.text("Shipping", col2X, y);
  doc.text(
    shippingCharge > 0 ? `Rs. ${shippingCharge.toFixed(2)}` : "FREE",
    rightEdge,
    y,
    { align: "right" },
  );
  y += 8;

  doc.setDrawColor(225);
  doc.line(col2X, y, rightEdge, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...INK);
  doc.text(`Total: Rs. ${order.total.toFixed(2)}`, rightEdge, y, {
    align: "right",
  });

  // --- Footer ---
  y += 22;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Thank you for shopping with Flucke.", marginX, y);
  doc.text("S & S Enterprises (GTIN : 07AFVFS3188M1ZX)", marginX, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text("fluckeskincare@gmail.com  •  +91 8766226077", marginX, y + 12);

  doc.save(`Invoice-${order.id}.pdf`);
}

export default function OrdersTab({ user, onViewDetails }) {
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (order) => {
    setDownloadingId(order.id);
    try {
      await downloadInvoice(order, user, logo);
    } catch (err) {
      console.error("Invoice generation failed:", err);
    } finally {
      setDownloadingId(null);
    }
  };
// console.log(user.orders,"order")
  return (
    <div className="rl-orders-grid">
      {user.orders.map((order) => (
        <div className="rl-order-card" key={order.id}>
          <div className="rl-order-card__head">
            <div className="rl-order-card__head-left">
              <div>
                <p className="rl-order-card__id">{order.id}</p>
                <p className="rl-order-card__date">{order.date}</p>
                {order?.orderNote && (
                  <p className="rl-order-card__date">{order?.orderNote}</p>
                )}
              </div>
            </div>
            <div className="rl-order-card__head-right">
              <StatusBadge
                status={
                  order.status === "pending" ? "Order Placed" : order.status
                }
              />
              <span className="rl-order-card__total">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="rl-order-card__items">
            {order.items.map((item) => (
              <div className="rl-order-item" key={item.name}>
                <img className="rl-order-item__thumb" src={item.image} alt="" />
                <div className="rl-order-item__info">
                  <p className="rl-order-item__name">{item.name}</p>
                  <p className="rl-order-item__qty">Qty: {item.qty}</p>
                </div>
                <span className="rl-order-item__price">
                  ₹{item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="rl-order-card__footer">
            <button
              className="rl-btn rl-btn--dark rl-btn--block"
              onClick={() => onViewDetails?.(order)}
            >
              <ViewIcon /> View Details
            </button>
            <button
              className="rl-btn rl-btn--ghost rl-btn--block"
              onClick={() => handleDownload(order)}
              disabled={downloadingId === order.id}
            >
              <DownloadIcon />{" "}
              {downloadingId === order.id ? "Generating…" : "Invoice"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}