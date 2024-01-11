import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import moment from "moment";

export default function Sales() {
  axios.defaults.withCredentials = true;
  const [dataSales, setDataSales] = useState([]);
  let no = 1;
  // const [countOrder, setCountOrder] = useState([]);

  const getLocalStorage = JSON.parse(localStorage.getItem("dataUser"));
  useEffect(() => {
    axios
      .get(`http://localhost:5001/sales/${getLocalStorage.dataUser.id}`)
      .then((res) => {
        console.log(res.data);
        setDataSales(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5001/count-order/${40}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setCountOrder(res.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  //   console.log(countOrder);
  // }, []);

  return (
    <>
      <Layout>
        <div className="sales">
          <table className="sales-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Shipping Method</th>
                <th>Paymnet Method</th>
                <th>Status</th>
                <th>Date Available</th>
              </tr>
            </thead>
            <tbody>
              {dataSales.map(
                ({
                  product,
                  users,
                  amount,
                  address,
                  phone_number,
                  shipping_method,
                  payment_method,
                  date_available,
                  status,
                }) => (
                  <tr>
                    <td>{no++}</td>
                    <td>{users.name}</td>
                    <td>{product.name}</td>
                    <td>{amount}</td>
                    <td>{address}</td>
                    <td>{phone_number}</td>
                    <td>{shipping_method.name}</td>
                    <td>{payment_method.name}</td>
                    <td>
                      <span
                        className={status ? "badge-success" : "badge-unsuccess"}
                      >
                        {status ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td>
                      {moment(date_available).format("dddd, D MMMM YYYY")}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
}
