import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import AddCommentForm from '../components/AddCommentForm';

const GET_TICKET = gql`
  query Ticket($id: ID!) {
    ticket(id: $id) {
      subject
      description
      status
      comments {
        id
        body
        user {
          name
        }
      }
    }
  }
`;

export default function TicketDetail() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TICKET, { variables: { id } });

  if (loading) return <p>Loading ticket...</p>;
  if (error) return <p>Error loading ticket</p>;

  const { ticket } = data;

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
        <p className="text-gray-700 mb-4">{ticket.description}</p>
        <p className="text-sm text-gray-600 mb-6">Status: {ticket.status}</p>

        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <ul className="space-y-3 mb-6">
            {ticket.comments.map((c) => (
            <li key={c.id} className="p-3 bg-white rounded shadow">
                <p className="text-gray-800">{c.body}</p>
                <p className="text-sm text-gray-500">— {c.user.name}</p>
            </li>
            ))}
        </ul>

        <AddCommentForm ticketId={id} />
        </div>
    </div>
  );
}
