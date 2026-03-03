import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import { GET_USERS } from "../graphql/queries";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    profileImage: null,
  });

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email || !form.age) {
      return;
    }

    await createUser({
      variables: {
        name,
        email,
        age: parseInt(form.age, 10),
        profileImage: form.profileImage,
      },
    });

    setForm({
      name: "",
      email: "",
      age: "",
      profileImage: null,
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <h2>Create User</h2>
        <p>Add a new user through GraphQL mutation.</p>
      </div>

      <label htmlFor="name">Full Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="John Doe"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="john@example.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <label htmlFor="age">Age</label>
      <input
        id="age"
        name="age"
        type="number"
        placeholder="25"
        min="1"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
        required
      />

      <label htmlFor="profileImage">Profile Image (optional)</label>
      <input
        id="profileImage"
        name="profileImage"
        type="file"
        accept="image/*"
        onChange={(e) =>
          setForm({
            ...form,
            profileImage: e.target.files?.[0] ?? null,
          })
        }
      />

      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
