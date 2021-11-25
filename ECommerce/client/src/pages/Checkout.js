import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";
import ReactQuill from "@adrianhelvik/react-quill";
import { SelectOutlined } from "@ant-design/icons";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log("products", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const saveAddresstoDb = () => {
    console.log("address", address.ops[0].insert);
    saveUserAddress(user.token, address.ops[0].insert).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address Saved");
      }
    });
  };

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue Shopping");
    });
  };

  const showAddress = () => {
    return (
      <>
        <ReactQuill
          value={address}
          onChange={onChangeTextArea}
          options={options}
        />
        <button className="btn btn-primary mt-2" onClick={saveAddresstoDb}>
          Save
        </button>
      </>
    );
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      if (res.data) {
        setTotalAfterDiscount(res.data);

        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);

        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showProductSummary = () => {
    {
      return products.map((p, i) => (
        <div key={i}>
          <p>
            {p.product.title} ({p.color}) * {p.count} ={" "}
            {p.product.price * p.count}
          </p>
        </div>
      ));
    }
  };

  const showApplyCoupon = () => {
    return (
      <>
        <input
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          value={coupon}
          type="text"
          className="form-control"
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
          Apply
        </button>
      </>
    );
  };

  const options = {
    modules: {
      toolbar: [
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"], // remove formatting button
        // ['formula'], Requires window.katex to be set
      ],
      clipboard: {
        matchVisual: false,
      },
    },
    placeholder: "",
    theme: "snow",
  };

  const onChangeTextArea = useCallback((contents) => {
    // console.log("contents", contents.ops[0].insert);
    setAddress(contents);
  }, []);

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>

        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>
        {totalAfterDiscount > 0 && (
          <>
            <p className="bg-success p-2">
              Discount Applied: Total Payable: ${totalAfterDiscount}
            </p>{" "}
          </>
        )}

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              onClick={emptyCart}
              disabled={!products.length}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
