class LuxListingitem < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :luximg, LuximgUploader
  mount_uploader :luximg2, Luximg2Uploader


end
