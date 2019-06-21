const graphQL = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} = graphQL;

//dummydata

const books = [
  { name: "Book 1", genre: "Fiction", id: "1", pages: 500, author_id: "1" },
  { name: "Book 2", genre: "Biography", id: "2", pages: 1000, author_id: "2" },
  { name: "Book 3", genre: "Sci-Fi", id: "3", pages: 75, author_id: "3" },
  { name: "Book 4", genre: "Non-Fiction", id: "4", pages: 500, author_id: "1" },
  { name: "Book 5", genre: "History", id: "5", pages: 1000, author_id: "2" },
  { name: "Book 6", genre: "Sci-Fi", id: "6", pages: 75, author_id: "2" }
];

const authors = [
  { name: "Ramith Sethi", age: 38, id: "1" },
  { name: "Kaisa Bondarava", age: 27, id: "2" },
  { name: "Carlos Lantigua", age: 30, id: "3" }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    pages: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id === parent.author_id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.author_id === parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from Database
        return books.find(book => book.id === args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.find(author => author.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
