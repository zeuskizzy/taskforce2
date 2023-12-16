class Section < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :secimg, SecimgUploader
  belongs_to :service
end
