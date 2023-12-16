class Feature < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :fimg, FimgUploader

end
