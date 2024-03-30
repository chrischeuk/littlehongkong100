class AddProductIdToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :product_id, :bigint
  end
end
