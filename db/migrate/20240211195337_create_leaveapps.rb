class CreateLeaveapps < ActiveRecord::Migration[6.1]
  def change
    create_table :leaveapps do |t|
      t.string :leave_package
      t.string :name
      t.string :email
      t.string :phone
      t.string :military_id
      t.boolean :status
      t.boolean :verified
      t.string :slug
      t.string :message
      t.datetime :date
      t.string :price
      t.string :duration
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :leaveapps, :slug
  end
end
