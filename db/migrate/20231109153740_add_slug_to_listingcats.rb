class AddSlugToListingcats < ActiveRecord::Migration[6.1]
  def change
    add_column :listingcats, :slug, :string
    add_index :listingcats, :slug
  end
end
