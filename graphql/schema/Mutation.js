const { gql } = require('apollo-server-express');

module.exports = gql`	
	type Mutation {
		addToCart(itemId: Int!): Item	
	}
`;
