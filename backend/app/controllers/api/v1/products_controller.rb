class Api::V1::ProductsController < ApplicationController
    # respond_to :json

  
    def show_products
      if params[:date_from]!=nil && params[:date_to] != nil
        @output=Product.joins(:brand).available_and_not_leased_between(params[:date_from],params[:date_to]).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      else
        @output=Product.joins(:items,:brand).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      end
        render json: @output
    end
    def show_products_serialized
      # sleep 0.5
      if params[:date_from]!=nil && params[:date_to] != nil
        # @output=Product.includes(:brand, {items:[:lease_records]}).order('product_name ASC')
        @available_item_ids= Product.joins(:brand).available_and_not_leased_between(params[:date_from],params[:date_to]).pluck("items.id")
        @output=Product.includes(:brand, {items:[:lease_records]}).order('product_name ASC').page(params[:page])
        # @output = ProductSerializer.new(@output).serializable_hash.to_json
        @output = ProductSerializer.new(@output,{
          meta:{has_more_pages:(Product.page(params[:page]).total_pages>params[:page].to_i)},
          include:[:items], 
          params: { date_from: params[:date_from], date_to: params[:date_to], 
            available_item_ids: @available_item_ids, to_include_lease_records: false, page: params[:page] }})
            .serializable_hash.to_json
      else
        @output=Product.all.order('product_name ASC').page(params[:page])
        @output = ProductSerializer.new(@output,{
          meta:{has_more_pages:(Product.page(params[:page]).total_pages>params[:page].to_i)},
          include:[:items], 
          params: {to_include_lease_records:false}}).serializable_hash.to_json
      end
        render json: @output
    end
  

    
    private
  
    def comment_params
      params.require(:product).permit(
        :id,
        :date_from,
        :date_to
      )
    end
  
  end