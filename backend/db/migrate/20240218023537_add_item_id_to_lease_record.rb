class AddItemIdToLeaseRecord < ActiveRecord::Migration[6.1]
  def change
    add_column :lease_records, :item_id, :bigint
  end
end
