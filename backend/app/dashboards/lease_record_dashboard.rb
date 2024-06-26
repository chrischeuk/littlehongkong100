require "administrate/base_dashboard"

class LeaseRecordDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    date_from: Field::Date,
    date_to: Field::Date,
    discount: Field::Number,
    item: Field::BelongsTo,
    price_per_unit: Field::Number,
    price_total: Field::Number,
    renter_email: Field::String,
    renter_name: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    spec: Field::String,
    product_name: Field::String,
    brand_name: Field::String
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    date_from
    date_to
    brand_name
    product_name
    spec
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    date_from
    date_to
    discount
    brand_name
    product_name    
    spec
    price_per_unit
    price_total
    renter_email
    renter_name
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    date_from
    date_to
    discount
    item
    price_per_unit
    price_total
    renter_email
    renter_name
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how lease records are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(lease_record)
  #   "LeaseRecord ##{lease_record.id}"
  # end
end
