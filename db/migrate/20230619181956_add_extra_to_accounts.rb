class AddExtraToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :email, :string
    add_column :accounts, :phone, :string
  end
end
