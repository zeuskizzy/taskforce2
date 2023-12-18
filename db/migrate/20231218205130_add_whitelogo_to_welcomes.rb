class AddWhitelogoToWelcomes < ActiveRecord::Migration[6.1]
  def change
    add_column :welcomes, :whitelogoimg, :string
  end
end
