import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_TICKETS = gql`
  query {
    tickets {
      id
      subject
      status
    }
  }
`;

export default function TicketList() {
  const { data, loading, error } = useQuery(GET_TICKETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tickets</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
      <ul className="space-y-4">
        {data.tickets.map((ticket) => (
          <li key={ticket.id} className="bg-gray-100 p-4 rounded shadow">
            <Link to={`/tickets/${ticket.id}`} className="text-lg font-medium text-blue-600">
              {ticket.subject}
            </Link>
            <p className="text-sm text-gray-600">Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
