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
    <form onSubmit={handleSubmit} className="mb-4 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">Add Email Configuration</h2>
      <input type="email" name="emailAddress" placeholder="Email Address" className="input" value={formData.emailAddress} onChange={handleChange} required />
      <select name="connectionType" value={formData.connectionType} onChange={handleChange} className="input">
        <option value="IMAP">IMAP</option>
        <option value="POP3">POP3</option>
        <option value="Gmail API">Gmail API</option>
        <option value="Outlook API">Outlook API</option>
      </select>
      <input type="text" name="username" placeholder="Username" className="input" value={formData.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="input" value={formData.password} onChange={handleChange} />
      <input type="text" name="host" placeholder="Host" className="input" value={formData.host} onChange={handleChange} />
      <input type="number" name="port" placeholder="Port" className="input" value={formData.port} onChange={handleChange} />
      <button type="submit" className="btn">Save Configuration</button>
    </form>
  );
}
