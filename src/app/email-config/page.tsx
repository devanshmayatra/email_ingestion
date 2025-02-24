"use client";

import { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import EmailList from "./EmailList";

export default function EmailConfigPage() {
  const [emailConfigs, setEmailConfigs] = useState([]);

  useEffect(() => {
    fetch("/api/email-ingestion")
      .then((res) => res.json())
      .then((data) => setEmailConfigs(data))
      .catch((err) => console.error("Error fetching email configs", err));
  }, []);

  const refreshData = async () => {
    const res = await fetch("/api/email-ingestion");
    const data = await res.json();
    setEmailConfigs(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Email Configuration</h1>
      <EmailForm onConfigAdded={refreshData} />
      <EmailList configs={emailConfigs} onConfigUpdated={refreshData} />
    </div>
  );
}
