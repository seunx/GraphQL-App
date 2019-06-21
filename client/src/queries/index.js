import { gql } from "apollo-boost";

export const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $author_id: ID!) {
    addBook(name: $name, genre: $genre, author_id: $author_id) {
      name
      id
    }
  }
`;