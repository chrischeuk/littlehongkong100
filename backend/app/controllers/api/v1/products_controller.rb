class Api::V1::ProductsController < ApplicationController
    # respond_to :json

  
    def show_products
      @output=Product.available_and_not_leased_between(params[:date_from],params[:date_to]).select("products.*, items.*")
      .sort_by{|key,value|key.item_name}.group_by { |d| d[:product_name]  }.values
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