import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AdminTable.css";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
} from "../../Redux/features/coupon/couponslice";

const initialCoupon = {
  code: "",
  discountType: "percentage",
  discountValue: "",
  minimumAmount: "",
  maximumDiscount: "",
  expiryDate: "",
  active: true,
};

export default function Coupons() {
  const dispatch = useDispatch();

  const { coupons } = useSelector((state) => state.coupons);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [coupon, setCoupon] = useState(initialCoupon);

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const filteredCoupons = coupons.filter((item) =>
    item.code.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = async () => {
    if (coupon._id) {
      await dispatch(
        updateCoupon({
          id: coupon._id,
          data: coupon,
        }),
      );
    } else {
      await dispatch(createCoupon(coupon));
    }

    setOpen(false);
    setCoupon(initialCoupon);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Coupon?")) return;

    dispatch(deleteCoupon(id));
  };

  return (
    <div className="admin-table-wrapper">
      <div className="table-header">
        <h2>Coupons</h2>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            placeholder="Search coupon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="save-btn"
            onClick={() => {
              setCoupon(initialCoupon);
              setOpen(true);
            }}
          >
            + Add Coupon
          </button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Code</th>

            <th>Type</th>

            <th>Value</th>

            <th>Min</th>

            <th>Max. Off</th>

            <th>Expiry</th>

            <th>Status</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCoupons.map((item) => (
            <tr key={item._id}>
              <td>{item.code}</td>

              <td>{item.discountType}</td>

              <td>{item.discountValue}</td>

              <td>{item.minimumAmount}</td>

              <td>{item.maximumDiscount}</td>

              <td>{new Date(item.expiryDate).toLocaleDateString()}</td>

              <td>
                {item.active ? (
                  <span className="badge green">Active</span>
                ) : (
                  <span className="badge red">Disabled</span>
                )}
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setCoupon({
                      ...item,
                      expiryDate: item.expiryDate?.slice(0, 10),
                    });
                    setOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{coupon._id ? "Edit Coupon" : "Add Coupon"}</h3>

            <input
              placeholder="Coupon Code"
              value={coupon.code}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  code: e.target.value.toUpperCase(),
                })
              }
            />

            <select
              value={coupon.discountType}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  discountType: e.target.value,
                })
              }
            >
              <option value="percentage">Percentage</option>

              <option value="fixed">Fixed</option>
            </select>

            <input
              type="number"
              placeholder="Discount Value"
              value={coupon.discountValue}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  discountValue: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Minimum Amount"
              value={coupon.minimumAmount}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  minimumAmount: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Maximum Discount"
              value={coupon.maximumDiscount}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  maximumDiscount: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={coupon.expiryDate}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  expiryDate: e.target.value,
                })
              }
            />
            <input
              placeholder="Text to display in offers"
              value={coupon.offerText}
              onChange={(e) =>
                setCoupon({
                  ...coupon,
                  offerText: e.target.value,
                })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={coupon.active}
                onChange={(e) =>
                  setCoupon({
                    ...coupon,
                    active: e.target.checked,
                  })
                }
              />
              Active Coupon
            </label>

            <div className="modal-actions">
              <button
                onClick={() => {
                  setCoupon(initialCoupon);
                  setOpen(false);
                }}
              >
                Cancel
              </button>

              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
