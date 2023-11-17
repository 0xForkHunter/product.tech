class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :slug, null: false
      t.string :description
      t.string :tagline
      t.string :thumbnail_url
      t.string :website_url
      t.string :product_hunt_url
      t.integer :reviews_count
      t.integer :reviews_rating
      t.integer :votes_count
      t.string :safe_address
      t.string :submitter_address
      t.timestamp :product_creation_date

      t.timestamps
    end
  end
end
