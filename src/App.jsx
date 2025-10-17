import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addProducts,
  removeProducts,
  toggleMode,
} from "./redux/Slice/productSlice";
import ListIcon from "@mui/icons-material/List";
import SummarizeIcon from "@mui/icons-material/Summarize";
import "./App.css";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, Typography, TextField, Button, Grid } from "@mui/material";

const App = () => {
  const products = useSelector((state) => state.product.products);
  const mode = useSelector((state) => state.product.mode);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [productsPerPage, setProductsPerPage] = React.useState(6);

  const lastIndexProduct = currentPage * productsPerPage;
  const firstIndexProduct = lastIndexProduct - productsPerPage;
  const currentProducts = products.slice(firstIndexProduct, lastIndexProduct);

  const [openModal, setOpenModal] = React.useState(false);

  const [formData, setFormData] = React.useState({
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  email: "",
  phone: "",
});

const [errors, setErrors] = React.useState({
  firstName: "",
  lastName: "",
  address: "",
  country: "",
  email: "",
  phone: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  setErrors({ ...errors, [name]: "" });
};

const validate = () => {
  let isValid = true;
  const newErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = "First name is required";
    isValid = false;
  }
  if (!formData.lastName.trim()) {
    newErrors.lastName = "Last name is required";
    isValid = false;
  }
  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
    isValid = false;
  }
  if (!formData.country.trim()) {
    newErrors.country = "Country is required";
    isValid = false;
  }
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Invalid email address";
    isValid = false;
  }
  if (!formData.phone.trim()) {
    newErrors.phone = "Phone number is required";
    isValid = false;
  } else if (!/^[0-9]{10}$/.test(formData.phone)) {
    newErrors.phone = "Enter a valid 10 digit phone number";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

const handleSubmit = () => {
  if (validate()) {
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      email: "",
      phone: "",
    });
    setOpenModal(false);
  }
};
  useEffect(async () => {
    const response = await fetchProducts();
    dispatch(addProducts(response));
  }, [dispatch]);

  const fetchProducts = async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  };

  

  return (
    <>
      <main className=" w-100vw bg-slate-400 flex ">
        <aside className=" w-1/4  p-10 space-y-6 bg-slate-300 h-screen">
          <div className="rounded-lg p-4 bg-gray-200 flex space-x-4">
            <img className="h-12 w-12 rounded-full" src="/dummy.jpeg" alt="" />
            <div>
              <h5 className="text-2xl font-bold">Hi Reader</h5>
              <p className="text-base font-semibold">Here is your News!</p>
            </div>
          </div>

          <div className=" p-4 bg-gray-200 flex flex-col rounded-xl items-center space-x-4">
            <h3 className="text-2xl font-bold">View Toggle</h3>
            <div className="flex  mt-5">
              <div
                className={`${
                  mode === "grid" ? "bg-gray-100" : "bg-green-300"
                } p-5 rounded-tl-xl rounded-bl-xl `}
              >
                <ListIcon
                  className="cursor-pointer"
                  sx={{ height: "20px" }}
                  onClick={() => dispatch(toggleMode("list"))}
                />
              </div>
              <div
                className={`${
                  mode === "grid" ? "bg-green-300" : "bg-gray-100"
                } p-5 rounded-tr-xl rounded-br-xl `}
              >
                <SummarizeIcon
                  className="cursor-pointer"
                  color="black"
                  sx={{ height: "20px" }}
                  onClick={() => dispatch(toggleMode("grid"))}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4 bg-gray-200 flex flex-col items-center space-x-4">
            <h3 className="text-2xl font-bold">Have a feedback</h3>
            <button
              className="bg-green-300 rounded-2xl mt-3 font-semibold p-4 text-xl"
              onClick={() => setOpenModal(true)}
            >
              We are Listening
            </button>
          </div>
        </aside>
        <section className=" w-3/4 ">
          {mode === "grid" ? (
            <div className=" grid grid-cols-3 gap-4 p-10 ">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="relative p-4 border border-gray-300 rounded-lg bg-white "
                >
                  <div className="flex gap-2">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="/dummy.jpeg"
                      alt=""
                    />
                    <h3 className=" font-bold text-lg mb-2">{product.title}</h3>
                  </div>
                  <p>{product.body}</p>
                  <CloseIcon
                    className="absolute text-red top-1 cursor-pointer right-2"
                    onClick={() => dispatch(removeProducts(product?.id))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className=" grid grid-cols-1 gap-4 p-10 ">
              {currentProducts.map((product) => (
                <div className="w-full flex gap-5 items-center">
                  <div
                    key={product.id}
                    className="w-full p-4  border border-gray-300 rounded-lg bg-white"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src="/dummy.jpeg"
                        alt=""
                      />
                      <h3 className="font-bold text-lg mb-2">
                        {product.title}
                      </h3>
                    </div>
                    <p>{product.body}</p>
                  </div>
                  <div className="bg-white h-12 w-12 p-2 rounded-full flex justify-center items-center">
                    <CloseIcon
                      className=" cursor-pointer text-red"
                      onClick={() => dispatch(removeProducts(product?.id))}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className=" flex gap-5 justify-center">
            {Array.from(
              { length: Math.ceil(products.length / productsPerPage) },
              (_, index) => (
                <button
                  className=" cursor-pointer hover:bg-gray-300 p-3 h-10 w-10 text-center flex justify-center items-center rounded-full text-xl bg-white"
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </section>
      </main>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        className=" w-full h-full p-10 flex justify-center items-center"
      >
        <Box className=" w-[90%] h-[90%] bg-slate-300 rounded-2xl flex gap-10 ">
      <div className="flex w-1/2 flex-col gap-5 p-10">
        <div className="rounded-lg p-4 bg-gray-200 flex space-x-4">
          <img className="h-12 w-12 rounded-full" src="/dummy.jpeg" alt="" />
          <div>
            <h5 className="text-2xl font-bold">Hi Reader</h5>
            <p className="text-base font-semibold">Here is your News!</p>
          </div>
        </div>

        <div className="rounded-lg p-4 bg-gray-200 flex flex-col items-center space-x-4">
          <h3 className="text-2xl font-bold">Have a feedback</h3>
          <button
            className="bg-green-300 rounded-2xl mt-3 font-semibold p-4 text-xl"
            onClick={() => setOpenModal(true)}
          >
            We are Listening
          </button>
        </div>
      </div>

      <div className=" w-3/4 p-10 h-full overflow-y-scroll ">
        <div className="flex flex-col items-center">
          <h5 className="text-2xl font-bold">
            Thank you so much for taking the time!
          </h5>
          <p className="text-base font-semibold">
            Please provide the below details
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              type="text"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="123 Street"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              type="text"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="India"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{errors.country}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Email ID</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="john@example.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-lg font-semibold">Phone No.</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="text"
              className=" rounded-lg p-4 bg-white text-base"
              placeholder="9876543210"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone}</span>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-green-300 rounded-2xl mt-3 font-semibold p-4 text-xl"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </Box>
      </Modal>
    </>
  );
};

export default App;
