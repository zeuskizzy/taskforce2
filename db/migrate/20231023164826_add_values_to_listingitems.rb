class AddValuesToListingitems < ActiveRecord::Migration[6.1]
  def change
    add_column :listingitems, :carimg, :string
  end
end
