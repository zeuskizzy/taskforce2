class Csection < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  mount_uploader :csectionimg, CsectionimgUploader

end
