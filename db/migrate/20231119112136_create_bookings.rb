class CreateBookings < ActiveRecord::Migration[6.1]
  def change
    create_table :bookings do |t|
      t.string :title
      t.string :first_name
      t.string :last_name
      t.string :address
      t.integer :rentalproduct_id
      t.boolean :status
      t.references :user, null: false, foreign_key: true
      t.string :email
      t.string :phone
      t.string :desc

      t.timestamps
    end
  end
end
