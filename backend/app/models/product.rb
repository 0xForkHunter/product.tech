class Product < ApplicationRecord
  validates :slug, presence: true
  validates :slug, uniqueness: true
end
