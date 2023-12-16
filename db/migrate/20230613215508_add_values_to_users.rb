class AddValuesToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :username, :string
    add_column :users, :phone, :string
    add_column :users, :referal, :string
    add_column :users, :terms, :boolean
    add_column :users, :slug, :string
    add_index :users, :slug
  end
end
