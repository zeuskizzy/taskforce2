class Header < ApplicationRecord
  mount_uploader :headerimg, HeaderimgUploader
  mount_uploader :abtsectionimg, AbtsectionimgUploader
  mount_uploader :adminlogoimg, AdminlogoimgUploader

end
