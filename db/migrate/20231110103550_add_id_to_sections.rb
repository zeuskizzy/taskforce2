class AddIdToSections < ActiveRecord::Migration[6.1]
  def change
    add_reference :sections, :service, null: false, foreign_key: true
    add_column :sections, :slug, :string
    add_index :sections, :slug
  end
end
