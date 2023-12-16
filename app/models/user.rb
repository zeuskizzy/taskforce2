class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

         has_many :accounts, dependent: :destroy
         has_many :vehicles, dependent: :destroy
         has_many :reporepairs, dependent: :destroy
         has_many :reporescues, dependent: :destroy

         validates :username, presence: true, uniqueness: true

end
