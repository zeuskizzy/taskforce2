class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :title
      t.string :sub_title
      t.string :address
      t.string :slug
      t.string :locationimg
      t.string :gps

      t.timestamps
    end
    add_index :locations, :slug
  end
end
