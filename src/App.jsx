import './App.css'
import { gql, useQuery } from '@apollo/client';

const GET_TICKETS = gql`
  query {
    tickets {
      id
      subject
      status
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_TICKETS);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
      <ul className="space-y-2">
        {data.tickets.map((ticket) => (
          <li key={ticket.id} className="p-4 bg-gray-100 rounded">
            <p className="font-semibold">{ticket.subject}</p>
            <p className="text-sm text-gray-600">Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App
