class ProductSerializer
  include JSONAPI::Serializer
  attributes :product_name, :images, :product_description, :brand_name
  has_many :items do |object, params|
    # if params[:date_to] then
    #   object.items_available_and_not_leased_between(params).order('spec ASC')
    # else
      object.items.order('spec ASC')
    # end
  end

end
