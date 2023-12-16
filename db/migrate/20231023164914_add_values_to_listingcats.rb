class AddValuesToListingcats < ActiveRecord::Migration[6.1]
  def change
    add_column :listingcats, :catcarimg, :string
  end
end
