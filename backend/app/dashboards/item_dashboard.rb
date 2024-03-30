require "administrate/base_dashboard"

class ItemDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    available: Field::Boolean,
    available_from: Field::Date,
    available_to: Field::Date,
    description: Field::Text,
    discount: Field::Number,
    item_name: Field::String,
    brand_name: Field::String,
    product_name: Field::String,
    lease_records: Field::HasMany,
    max_days: Field::Number,
    price_per_unit: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    product: Field::BelongsTo,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    brand_name
    product_name
    item_name
    available_from
    available_to
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    id
    available
    available_from
    available_to
    description
    discount
    brand_name
    product_name    
    item_name
    lease_records
    max_days
    price_per_unit
    created_at
    updated_at
    product
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    available
    available_from
    available_to
    description
    discount
    item_name
    lease_records
    max_days
    price_per_unit
    product
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

  # Overwrite this method to customize how items are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(item)
  #   "Item ##{item.id}"
  # end
end
