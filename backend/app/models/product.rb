class Product < ApplicationRecord
  has_many :items, dependent: :destroy
  belongs_to :brand

  scope :available_and_not_leased_between, ->(start_date, end_date){joins(:items).merge(Item.available_and_not_leased_between(start_date, end_date))}
    
end
