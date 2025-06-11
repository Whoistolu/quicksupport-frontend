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

  if (loading) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p className="text-gray-500 animate-pulse">Loading ticket...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <p className="text-red-600 font-medium">⚠️ Error loading ticket. Please try again.</p>
      </div>
    );
  }

  const { ticket } = data;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{ticket.subject}</h1>
        <p className="text-gray-700 leading-relaxed mb-4">{ticket.description}</p>
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
          Status: {ticket.status}
        </span>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>
        {ticket.comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {ticket.comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
              >
                <p className="text-gray-800 mb-1">{comment.body}</p>
                <p className="text-sm text-gray-500">— {comment.user.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Add a Comment</h3>
        <AddCommentForm ticketId={id} />
      </div>
    </div>
  );
}
