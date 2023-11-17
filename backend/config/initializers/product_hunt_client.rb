require "graphql/client"
require "graphql/client/http"

# Star Wars API example wrapper
module ProductHunt
  # Configure GraphQL endpoint using the basic HTTP network adapter.
  HTTP = GraphQL::Client::HTTP.new("https://api.producthunt.com/v2/api/graphql") do
    def headers(context)
      # Optionally set any HTTP headers
      { "Authorization" => "Bearer #{ENV["PRODUCT_HUNT_ACCESS_TOKEN"]}" }
    end
  end

  # Fetch latest schema on init, this will make a network request
  Schema = GraphQL::Client.load_schema(HTTP)

  # However, it's smart to dump this to a JSON file and load from disk
  #
  # Run it from a script or rake task
  #   GraphQL::Client.dump_schema(SWAPI::HTTP, "path/to/schema.json")
  #
  # Schema = GraphQL::Client.load_schema("path/to/schema.json")

  GraphQLClient = GraphQL::Client.new(schema: Schema, execute: HTTP)
end
