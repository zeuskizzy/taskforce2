class CreateFeatures < ActiveRecord::Migration[6.1]
  def change
    create_table :features do |t|
      t.string :fimg
      t.string :title
      t.string :sub_title
      t.string :body
      t.string :slug

      t.timestamps
    end
    add_index :features, :slug
  end
end
