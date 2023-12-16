class Rentalproduct < ApplicationRecord

  belongs_to :rental
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :rpimg, RpimgUploader
end
