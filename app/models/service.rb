class Service < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :serviceimg, ServiceimgUploader
  mount_uploader :icon, IconUploader
  has_many :sections, dependent: :destroy


end
