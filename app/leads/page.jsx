import React, { useEffect, useState } from 'react';

export default function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/.netlify/functions/get-leads')
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar leads');
        return res.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando leads...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h1>Leads</h1>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            <a href={`/leads/${lead.id}`}>{lead.nome || lead.name || 'Lead sem nome'}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
