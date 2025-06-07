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
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-lg shadow animate-pulse space-y-2"
          >
            <div className="h-6 bg-gray-300 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error loading tickets</p>;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <div className="p-4 sm:p-8">
        <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
        <ul className="space-y-4">
          {data.tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200"
            >
              <Link
                to={`/tickets/${ticket.id}`}
                className="block text-xl font-semibold text-blue-600 hover:underline"
              >
                {ticket.subject}
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                Status: {ticket.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
