class AddMoreValuesToListingcats < ActiveRecord::Migration[6.1]
  def change
    add_column :listingcats, :iframelink, :string
  end
end
