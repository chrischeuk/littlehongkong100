class Api::V1::ProductsController < ApplicationController
    # respond_to :json

  
    def show_products
      if params[:date_from]!=nil && params[:date_to] != nil
        @output=Product.available_and_not_leased_between(params[:date_from],params[:date_to]).joins(:brand).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      else
        @output=Product.joins(:items,:brand).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      end
        render json: @output
    end
    def show_products_serialized
      # if params[:date_from]!=nil && params[:date_to] != nil
        @output=Product.all.order('product_name ASC')
        #.available_and_not_leased_between(params[:date_from],params[:date_to]).distinct
        # .joins(:brand).select("products.*, items.*,brands.*")
        # .sort_by{|key,value|key.spec}#.group_by { |d| d[:product_name]  }
        @output = ProductSerializer.new(@output,{include:[:items], params: { date_from: params[:date_from], date_to: params[:date_to]}}).serializable_hash.to_json
      # else
      #   @output=Product.joins(:items,:brand).select("products.*, items.*,brands.brand_name")
      #   .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      # end
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