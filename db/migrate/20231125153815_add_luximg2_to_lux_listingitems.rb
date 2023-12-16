class AddLuximg2ToLuxListingitems < ActiveRecord::Migration[6.1]
  def change
    add_column :lux_listingitems, :luximg2, :string
  end
end
