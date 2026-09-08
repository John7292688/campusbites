import { useEffect, useState } from "react";
import ownerApi from "../../services/ownerApi";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await ownerApi.get(
        "/orders/customers"
      );

      setCustomers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading customers...</h2>;
  }

  return (
    <div className="customers-page">
  <h1 style={{ marginBottom: "30px" }}>
    Customers
  </h1>

  {customers.length === 0 ? (
    <p>No customers yet.</p>
  ) : (
    <div className="customers-table-wrapper">
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#F9FAFB",
              textAlign: "left",
            }}
          >
            <th style={{ padding: "16px" }}>
              Name
            </th>

            <th style={{ padding: "16px" }}>
              Phone
            </th>

            <th style={{ padding: "16px" }}>
              Total Orders
            </th>

            <th style={{ padding: "16px" }}>
              Total Spent
            </th>

            <th style={{ padding: "16px" }}>
              Last Order
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              style={{
                borderTop:
                  "1px solid #E5E7EB",
              }}
            >
              <td style={{ padding: "16px" }}>
                {customer.full_name}
              </td>

              <td style={{ padding: "16px" }}>
                {customer.phone}
              </td>

              <td style={{ padding: "16px" }}>
                {customer.total_orders}
              </td>

              <td style={{ padding: "16px" }}>
                ₦
                {Number(
                  customer.total_spent
                ).toLocaleString()}
              </td>

              <td style={{ padding: "16px" }}>
                {new Date(
                  customer.last_order_date
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  );
};

export default Customers;