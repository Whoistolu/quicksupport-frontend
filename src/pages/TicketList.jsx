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

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 p-5 rounded-xl shadow-sm animate-pulse space-y-3"
          >
            <div className="h-6 bg-gray-300 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <p className="text-red-600 font-medium">⚠️ Failed to load tickets. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Support Tickets</h1>
        <p className="text-gray-500 mt-1">Click on a ticket to view its details</p>
      </header>

      <ul className="space-y-5">
        {data.tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="bg-white border border-gray-200 hover:border-blue-400 p-5 rounded-xl shadow-sm hover:shadow transition duration-200"
          >
            <Link
              to={`/tickets/${ticket.id}`}
              className="block text-lg font-semibold text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {ticket.subject}
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              <span className="font-medium text-gray-700">Status:</span> {ticket.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
