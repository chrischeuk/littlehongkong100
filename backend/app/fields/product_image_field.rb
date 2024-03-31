require "administrate/field/base"

class ProductImageField < Administrate::Field::Base
  def to_s
    data
  end
end
