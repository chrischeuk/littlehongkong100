class LeaseRecord < ApplicationRecord
  belongs_to :item
  scope :has_lease_record_on, ->(date){where(["date_from <= ? ", date]).where(["date_to >= ? ", date])}
  # scope :not_leased_on, ->(date){where.not(id: leased_on(date))}

end
