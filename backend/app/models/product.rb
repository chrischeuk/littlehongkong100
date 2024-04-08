class Product < ApplicationRecord
  has_many :items, dependent: :destroy
  belongs_to :brand

  scope :available_and_not_leased_between, ->(start_date, end_date){joins(:items).merge(Item.available_and_not_leased_between(start_date, end_date))}
  def items_available_and_not_leased_between(params)
    self.items.available_and_not_leased_between(params[:date_from], params[:date_to])    
  end    
  def brand_name
    self.brand.brand_name
  end

end
