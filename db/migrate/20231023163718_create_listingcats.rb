class CreateListingcats < ActiveRecord::Migration[6.1]
  def change
    create_table :listingcats do |t|
      t.string :title
      t.boolean :status

      t.timestamps
    end
  end
end
