class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :icon
      t.string :body
      t.string :slug

      t.timestamps
    end
    add_index :reviews, :slug
  end
end
