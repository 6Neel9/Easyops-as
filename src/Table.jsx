import { useState, useEffect } from "react";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setTableData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, contactNumber } = formData;
    if (
      !firstName ||
      !lastName ||
      !contactNumber ||
      tableData.some(
        (person) =>
          person.name.toLowerCase() ===
            `${firstName} ${lastName}`.toLowerCase() ||
          person.contactNumber === contactNumber
      )
    ) {
      alert("Duplicate Found");
      return;
    }
    setTableData([
      ...tableData,
      { name: `${firstName} ${lastName}`, contactNumber },
    ]);
    setFormData({
      firstName: "",
      lastName: "",
      contactNumber: "",
    });
  };

  const [filter, setFilter] = useState("");

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      setTableData([
        ...tableData.slice(0, index),
        ...tableData.slice(index + 1),
      ]);
    }
  };

  const handleSort = () => {
    setTableData([...tableData.sort((a, b) => a.name.localeCompare(b.name))]);
  };

  const filteredData = tableData.filter(({ name }) =>
    `${name}`.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="inside">
      <h1>Easyops Table</h1>
      <form onSubmit={handleSubmit} className="inputs">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          placeholder="Contact Number"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Person</button>
      </form>
      <br />
      <input
        id="search"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search by name"
      />
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th onClick={handleSort} style={{ cursor: "pointer" }}>
              Name
            </th>
            <th>Contact Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(({ name, contactNumber }, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{contactNumber}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
