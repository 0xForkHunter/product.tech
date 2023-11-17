require "dry-initializer"
require "product_hunt/client"

module Products
  class Import
    extend Dry::Initializer

    option :slug
    option :submitter_address
    option :safe_address

    def call
      raise "Product slug is mandatory" unless slug
      raise "Product not found" unless product_hunt_object
      binding.pry
      Product.create!(product_data)
    end

    private

    def product_data
      {
        submitter_address: submitter_address,
        safe_address: safe_address,
        slug: slug,
        name: product_hunt_object.name,
        description: product_hunt_object.description,
        product_creation_date: product_hunt_object.created_at,
        reviews_count: product_hunt_object.reviews_count,
        reviews_rating: product_hunt_object.reviews_rating,
        votes_count: product_hunt_object.votes_count,
        tagline: product_hunt_object.tagline,
        product_hunt_url: product_hunt_object.url,
        website_url: product_hunt_object.website,
        thumbnail_url: product_hunt_object.thumbnail.url
      }
    end

    def product_hunt_object
      @product_hunt_object ||= product_hunt_client.get_product(slug:).post
    end

    def product_hunt_client
      @product_hunt_client ||= ProductHunt::Client.new
    end
  end
end
