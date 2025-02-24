"use client";

export default function EmailList({ configs, onConfigUpdated }: { configs: any[]; onConfigUpdated: () => void }) {
  const handleDelete = async (id: string) => {
    await fetch("/api/email-ingestion", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    onConfigUpdated();
  };

  const fetchEmails = async (config:any) => {
    const res = await fetch("/api/email-retrieval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ config: config }),  // Ensure emailConfig is defined
    });
    
    if (res.ok) {
      alert("Emails checked and PDFs downloaded!");
    } else {
      alert("Failed to fetch emails");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Configured Emails</h2>
      {configs.length === 0 ? <p>No configurations found.</p> : null}
      <ul>
        {configs.map((config) => (
          <li key={config.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
            <div>
              <p><strong>{config.emailAddress}</strong></p>
              <p className="text-sm text-gray-500">{config.connectionType} - {config.host}:{config.port}</p>
            </div>
            <button onClick={() => handleDelete(config.id)} className="text-red-500">Delete</button>
            <button onClick={()=>fetchEmails(config)} className="btn btn-primary">Check Inbox</button>;
          </li>
        ))}
      </ul>
    </div>
  );
}
