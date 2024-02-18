class ChangeAvailableToNonNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :items, :available, false, true
  end
end
