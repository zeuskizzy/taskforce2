class CreateListingitems < ActiveRecord::Migration[6.1]
  def change
    create_table :listingitems do |t|
      t.string :iframelink
      t.string :mileage
      t.string :bodytype
      t.string :doors
      t.string :engine
      t.string :transmission
      t.string :drivetrain
      t.string :exteriorcolor
      t.string :interiorcolor
      t.string :condition
      t.string :feul
      t.string :title
      t.string :slug
      t.string :listingcat
      t.string :references

      t.timestamps
    end
    add_index :listingitems, :slug
  end
end
