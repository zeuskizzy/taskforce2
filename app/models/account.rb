class Account < ApplicationRecord
  require 'httparty'
   extend FriendlyId
  friendly_id :account_number, use: :slugged


  validates :user, presence: true
  before_validation :load_defaults
  def load_defaults
    if self.new_record?
      self.account_number = SecureRandom.random_number(10000000000)
      self.status = true

    end
  end
  belongs_to :user
end
