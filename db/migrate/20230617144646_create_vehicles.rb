class CreateVehicles < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicles do |t|
      t.string :l_first_name
      t.string :l_last_name
      t.string :l_address
      t.string :l_email
      t.string :v_name
      t.string :v_type
      t.string :v_plate_number
      t.string :v_info
      t.string :l_phone
      t.string :slug
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :vehicles, :slug
  end
end
