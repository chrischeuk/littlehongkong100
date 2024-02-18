class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :item_name
      t.text :description
      t.integer :price_per_unit
      t.boolean :available
      t.date :available_from
      t.date :available_to
      t.integer :max_days
      t.integer :discount

      t.timestamps
    end
  end
end
