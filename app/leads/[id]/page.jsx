import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function LeadDetail() {
  const params = useParams();
  const { id } = params;
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/.netlify/functions/get-lead-by-id?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar detalhes do lead');
        return res.json();
      })
      .then((data) => {
        setLead(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Carregando detalhes...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!lead) return <div>Nenhum lead encontrado.</div>;

  return (
    <div>
      <h1>Detalhes do Lead</h1>
      <p><strong>ID:</strong> {lead.id}</p>
      <p><strong>Nome:</strong> {lead.nome || lead.name || 'Sem nome'}</p>
      {/* Adicione outros campos relevantes do lead */}
    </div>
  );
}
