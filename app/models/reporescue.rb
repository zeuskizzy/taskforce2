class Reporescue < ApplicationRecord
  belongs_to :user
  extend FriendlyId
 friendly_id :v_name, use: :slugged

end
