import React from 'react';

// Exemplo de fetch para função Netlify (ajuste o endpoint conforme necessário)
async function getPipeline() {
  const res = await fetch('/.netlify/functions/get-pipeline');
  if (!res.ok) throw new Error('Erro ao buscar pipeline');
  return res.json();
}

export default async function PipelinePage() {
  let pipeline = [];
  let error = null;
  try {
    pipeline = await getPipeline();
  } catch (e) {
    error = e.message;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Pipeline de Leads</h1>
      {error && <div style={{color: 'red'}}>Erro: {error}</div>}
      {!error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Lead</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Status</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Responsável</th>
            </tr>
          </thead>
          <tbody>
            {pipeline.map((item) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.nome}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.status}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{item.responsavel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
