class Brand < ApplicationRecord
  has_many :products, dependent: :destroy
  has_many :items, through: :products
end
