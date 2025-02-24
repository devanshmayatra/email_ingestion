"use client";

import { useState } from "react";

export default function EmailForm({ onConfigAdded }: { onConfigAdded: () => void }) {
  const [formData, setFormData] = useState({
    emailAddress: "",
    connectionType: "IMAP",
    username: "",
    password: "",
    host: "",
    port: "",
    useSSL: true,
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    console.log("Submitting form with data:", formData); // 🛑 Debugging log
    
    const res = await fetch("/api/email-ingestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailAddress: formData.emailAddress.trim(),
        connectionType: formData.connectionType,
        username: formData.username || null,
        password: formData.password || null,
        host: formData.host || null,
        port: formData.port ? Number(formData.port) : null,
        useSSL: formData.useSSL ?? true,
      }),
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response from server:", errorData);
    } else {
      onConfigAdded();
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded text-black flex flex-wrap gap-2 " >
      <h2 className="text-xl font-semibold mb-2">Add Email Configuration</h2>
      <input type="email" name="emailAddress" placeholder="Email Address" className=" h-10 border-black border-2 rounded-md pl-2 input" value={formData.emailAddress} onChange={handleChange} required />
      <select name="connectionType" value={formData.connectionType} onChange={handleChange} className=" h-10 border-black border-2 rounded-md pl-2 input">
        <option value="IMAP">IMAP</option>
      </select>
      <input type="text" name="username" placeholder="Username" className=" h-10 border-black border-2 rounded-md pl-2 input" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className=" h-10 border-black border-2 rounded-md pl-2 input" value={formData.password} onChange={handleChange} />
      <input type="text" name="host" placeholder="Host | eg. imap.gmail.com" className=" h-10 border-black border-2 rounded-md pl-2 input" value={formData.host} onChange={handleChange} />
      <input type="number" name="port" placeholder="Port | 993" className=" h-10 border-black border-2 rounded-md pl-2 input" value={formData.port} onChange={handleChange} />
      <button type="submit" className="btn border-2 px-2 py-1 border-black rounded-md">Save Configuration</button>
    </form>
  );
}
