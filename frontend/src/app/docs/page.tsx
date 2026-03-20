export default function DocsPage() {
  const apiDocsUrl = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api-docs`
    : 'http://localhost:4000/api-docs';

  return (
    <main>
      <h1>API Documentation (Swagger)</h1>
      <p>
        Backend Swagger endpoint:{' '}
        <a href={apiDocsUrl} target="_blank" rel="noreferrer">
          {apiDocsUrl}
        </a>
      </p>
      <iframe
        title="Swagger UI"
        src={apiDocsUrl}
        style={{ width: '100%', height: '80vh', border: '1px solid #ddd', background: '#fff' }}
      />
    </main>
  );
}
