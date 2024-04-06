class Api::V1::ProductsController < ApplicationController
    # respond_to :json

  
    def show_products
      if params[:date_from]!=nil && params[:date_to] != nil
        @output=Product.available_and_not_leased_between(params[:date_from],params[:date_to]).joins(:brand).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      else
        @output=Product.available_and_not_leased_between(Time.now(),Time.now()+3.days).joins(:brand).select("products.*, items.*,brands.brand_name")
        .sort_by{|key,value|key.spec}.group_by { |d| d[:product_name]  }.values.sort_by{|arr| arr[0].product_name}
      end
        # .deep_pluck(:id,:product_name, :images, :items=> [:item_name] )
        # puts (params[:date_from])
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