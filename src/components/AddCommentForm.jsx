import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_COMMENT = gql`
  mutation AddComment($ticketId: ID!, $body: String!) {
    addCommentToTicket(input: { ticketId: $ticketId, body: $body }) {
      comment {
        id
        body
      }
      errors
    }
  }
`;

export default function AddCommentForm({ ticketId }) {
  const [body, setBody] = useState('');
  const [addComment, { loading }] = useMutation(ADD_COMMENT, {
    variables: { ticketId, body },
    refetchQueries: ['Ticket'], // will re-fetch ticket detail
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    await addComment();
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full p-3 border border-gray-300 rounded"
        rows="3"
        placeholder="Write a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
