import { useState } from "react";
import { useDispatch } from "react-redux";

import { addAdmin } from "../../../Config/store/admin";

function AdminForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addAdmin({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="user name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">Tạo</button>
    </form>
  );
}

export default AdminForm;
