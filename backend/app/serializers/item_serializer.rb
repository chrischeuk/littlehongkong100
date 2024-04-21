class ItemSerializer
  include JSONAPI::Serializer
  attributes :available do |object, params|
    if params && !params[:to_include_lease_records] then 
      # object.available_and_not_leased_between(params)
      if params[:available_item_ids] then
        params[:available_item_ids].include? object.id
      else
        true
      end
    end
  end
  attributes :spec, :description, :product_name, :images, :brand_name, :available_from, :available_to
  has_many :lease_records , if:Proc.new { |record, params| params[:to_include_lease_records]}
  
end
