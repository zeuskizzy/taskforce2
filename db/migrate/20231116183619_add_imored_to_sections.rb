class AddImoredToSections < ActiveRecord::Migration[6.1]
  def change
    add_column :sections, :services, :integer
  end
end
