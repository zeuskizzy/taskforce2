class CreateAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounts do |t|
      t.string :account_number
      t.boolean :status
      t.string :slug
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :accounts, :slug
  end
end
