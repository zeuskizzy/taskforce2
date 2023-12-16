class Listingcat < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :catcarimg, CatcarimgUploader


end
