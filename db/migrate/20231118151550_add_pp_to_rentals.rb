class AddPpToRentals < ActiveRecord::Migration[6.1]
  def change
    add_column :rentals, :optionclass, :string
  end
end
