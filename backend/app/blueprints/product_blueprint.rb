class ProductBlueprint < Blueprinter::Base
  fields :id

  view :normal do
    fields :name,
      :slug,
      :description,
      :tagline,
      :thumbnail_url,
      :website_url,
      :product_hunt_url,
      :reviews_count,
      :reviews_rating,
      :votes_count,
      :safe_address,
      :product_creation_date,
      :submitter_address
  end
end
