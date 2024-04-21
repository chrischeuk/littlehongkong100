class LeaseRecordSerializer
  include JSONAPI::Serializer
  # belongs_to :item
  attributes :date_from, :date_to
end
