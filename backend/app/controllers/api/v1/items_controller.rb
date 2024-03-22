class Api::V1::ItemsController < ApplicationController
  # respond_to :json
  def index
    @output=Item.all
    render json: @output
  end

  def show_items
    @output=Item.available_and_not_leased_between(params[:date_from],params[:date_to])
    # puts (params[:date_from])
    render json: @output
  end

  def show_item
    @output=Item.find(params[:id]).lease_records.pluck( :date_from, :date_to)
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