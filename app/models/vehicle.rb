class Vehicle < ApplicationRecord
  belongs_to :user
  extend FriendlyId
 friendly_id :l_first_name, use: :slugged

end
