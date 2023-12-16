class Rental < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :rentalimg, RentalimgUploader
  mount_uploader :rentalheaderimg, RentalheaderimgUploader

  has_many :rentalproducts

end
