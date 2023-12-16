class CreateRentalproducts < ActiveRecord::Migration[6.1]
  def change
    create_table :rentalproducts do |t|
      t.string :title
      t.string :sub_title
      t.string :desc
      t.text :body
      t.string :slug
      t.integer :rental_id
      t.string :price
      t.string :discount
      t.string :rpimg
      t.integer :location_id
      t.integer :service_id

      t.timestamps
    end
    add_index :rentalproducts, :slug
  end
end
