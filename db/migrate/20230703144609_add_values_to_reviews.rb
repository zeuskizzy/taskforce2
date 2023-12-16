class AddValuesToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :reviewimg, :string
  end
end
