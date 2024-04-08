class Api::V1::ItemsController < ApplicationController
  # respond_to :json
  def index
    @output=Item.all
    render json: @output
  end

  # def show_items
  #   @output=Item.available_and_not_leased_between(params[:date_from],params[:date_to]).joins(:product)
  #     .deep_pluck(:id,:item_name, :product=> [:product_name, :images])
  #   # puts (params[:date_from])
  #   render json: @output
  # end

  def show_item
    @output=Item.where(id:params[:id]).left_outer_joins(:lease_records, :product)
      .select("items.description, items.price_per_unit, 
              items.available_from, items.available_to,
              items.max_days, items.discount, items.product_id, 
              products.*, lease_records.date_from, lease_records.date_to")
    render json: @output
  end

  def show_item_serialized
    @item=Item.where(id:params[:id])
    @output = ItemSerializer.new(@item,{include:[:lease_records],params:{to_include_lease_records: true }}).serializable_hash.to_json
    render json: @output

  end

  
  private

  def comment_params
    params.require(:item).permit(
      :id,
      :date_from,
      :date_to
    )
  end

end