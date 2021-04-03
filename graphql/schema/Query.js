const { gql } = require('apollo-server-express');

module.exports = gql`
	type Item {
		id: Int!
		name: String!
	}
	
	type Query {
		items: [Item]
	}
`;
