class DuplicationValidator < ActiveModel::Validator
  def validate(record)
    if LeaseRecord.where(item_id:record.item_id).where.not(id:record.id).has_lease_record_between(record.date_from,record.date_to).count>0
      record.errors.add :base, "There is duplication"
    end
  end
end

class LeaseRecord < ApplicationRecord
  belongs_to :item

  scope :has_lease_record_on, ->(date){where(["date_from <= ? ", date]).where(["date_to >= ? ", date])}
  # scope :not_leased_on, ->(date){where.not(id: leased_on(date))}
  scope :has_lease_record_end_between_the_requested_period, ->(start_date, end_date){
    where(["date_to >= ? AND date_to <= ?", start_date, end_date])
  }
  scope :has_lease_record_covering_the_requested_period, ->(start_date, end_date){
    where(["date_from <= ? AND date_to >= ? ", start_date, end_date])
  }
  scope :has_lease_record_within_the_requested_period, ->(start_date, end_date){
    where(["date_from >= ? AND date_to <= ? ", start_date, end_date])
  }  
  scope :has_lease_record_start_between_the_requested_period, ->(start_date, end_date){
    where(["date_from >= ? AND date_from <= ? ", start_date, end_date])
  }    
  scope :has_lease_record_between, ->(start_date, end_date){
    has_lease_record_end_between_the_requested_period(start_date,end_date)
    .or(has_lease_record_covering_the_requested_period(start_date, end_date))
    .or(has_lease_record_within_the_requested_period(start_date, end_date))    
    .or(has_lease_record_start_between_the_requested_period(start_date, end_date))
  }

  validates_with DuplicationValidator
  def spec
    self.item.spec
  end
  def product_name
    self.item.product.product_name
  end
  def brand_name
    self.item.product.brand.brand_name
  end
end

