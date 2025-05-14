// src/pages/CreateUserPage.tsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/lib/api"; // you'll create this function next
import { useToast } from "@/components/ui/use-toast";

function CreateUserPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "uploader", // default role
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({ title: "User created successfully!" });
    },
    onError: (error: any) => {
      toast({ title: "Error creating user", description: error.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="admin">Admin</option>
            <option value="uploader">Uploader</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}

export default CreateUserPage;
