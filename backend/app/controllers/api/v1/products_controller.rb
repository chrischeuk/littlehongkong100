class Api::V1::ProductsController < ApplicationController
    # respond_to :json

  
    def show_products
      @output=Product.available_and_not_leased_between(params[:date_from],params[:date_to]).distinct
        .deep_pluck(:id,:product_name, :images, :items=> [:item_name, :id ])
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