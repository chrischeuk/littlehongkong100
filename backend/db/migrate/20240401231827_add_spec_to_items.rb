class AddSpecToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :spec, :string
  end
end
