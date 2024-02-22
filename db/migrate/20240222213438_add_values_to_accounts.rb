class AddValuesToAccounts < ActiveRecord::Migration[6.1]
  def change
    add_column :accounts, :first_name, :string
    add_column :accounts, :last_name, :string
    add_column :accounts, :state, :string
    add_column :accounts, :city, :string
    add_column :accounts, :zipcode, :string
    add_column :accounts, :address, :string
    add_column :accounts, :relationship, :string

  end
end
