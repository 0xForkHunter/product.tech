module ProductHunt
  class Client
    PRODUCT_QUERY = ProductHunt::GraphQLClient.parse <<-'GRAPHQL'
      query($slug: String) {
        post(slug: $slug) {
          name
          description
          createdAt
          reviewsCount
          reviewsRating
          tagline
          url
          votesCount
          website
          thumbnail {
            url
          }
          media {
            url
          }
        }
      }
    GRAPHQL

    def get_product(slug:)
      graph_ql_client.query(PRODUCT_QUERY, variables: {slug:}).data
    end

    def graph_ql_client
      @graph_ql_client ||= ProductHunt::GraphQLClient
    end
  end
end
