class CreateRentals < ActiveRecord::Migration[6.1]
  def change
    create_table :rentals do |t|
      t.string :title
      t.string :sub_title
      t.string :address
      t.string :slug
      t.string :rentalimg
      t.string :rentalheaderimg
      t.string :body

      t.timestamps
    end
    add_index :rentals, :slug
  end
end
