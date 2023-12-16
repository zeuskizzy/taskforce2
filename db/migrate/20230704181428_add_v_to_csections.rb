class AddVToCsections < ActiveRecord::Migration[6.1]
  def change
    add_column :csections, :csectionimg, :string
  end
end
