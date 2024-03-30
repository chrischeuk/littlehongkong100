class Item < ApplicationRecord
  has_many :lease_records, dependent: :destroy
  belongs_to :product, dependent: :destroy
  scope :available_on, ->(date){where(["available_from <= ? ", date]).where(["available_to >= ? ", date]).where("available != false")}
  scope :leased_on, ->(date){joins(:lease_records).merge(LeaseRecord.has_lease_record_on(date))}
  scope :not_leased_on, ->(date){where.not(id: leased_on(date))}
  scope :available_and_not_leased_on, ->(date){where.not(id: leased_on(date)).available_on(date)}
  scope :available_but_leased_on, ->(date){where(id: leased_on(date)).available_on(date)}
  scope :leased_between, ->(start_date, end_date){joins(:lease_records).merge(LeaseRecord.has_lease_record_between(start_date, end_date))}
  scope :not_leased_between, ->(start_date, end_date){where.not(id: leased_between(start_date, end_date))}
  scope :available_between, ->(start_date, end_date){where(["available_from <= ? ", start_date]).where(["available_to >= ? ", end_date]).where("available != false")}
  scope :available_and_not_leased_between, ->(start_date, end_date){where(id: available_between(start_date,end_date)).not_leased_between(start_date,end_date)}

  def product_name
    self.product.product_name
  end
  def brand_name
    self.product.brand.brand_name
  end  
end
