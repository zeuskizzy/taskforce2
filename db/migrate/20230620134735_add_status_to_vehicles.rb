class AddStatusToVehicles < ActiveRecord::Migration[6.1]
  def change
    add_column :vehicles, :status, :boolean
  end
end
