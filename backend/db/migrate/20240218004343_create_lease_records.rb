class CreateLeaseRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :lease_records do |t|
      t.date :date_from
      t.date :date_to
      t.integer :price_per_unit
      t.integer :discount
      t.integer :price_total
      t.string :renter_name
      t.string :renter_email

      t.timestamps
    end
  end
end
