class AddExtravaluesToHeaders < ActiveRecord::Migration[6.1]
  def change
    add_column :headers, :headertext, :string
    add_column :headers, :headersubtext, :string
  end
end
