class Board < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :boardimg, BoardimgUploader

end
