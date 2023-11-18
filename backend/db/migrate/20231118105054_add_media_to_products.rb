class AddMediaToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :media, :string, array: true, default: []
  end
end
