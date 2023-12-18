class Welcome < ApplicationRecord
  mount_uploader :logoimg, LogoimgUploader
  mount_uploader :whitelogoimg, WhitelogoimgUploader

end
