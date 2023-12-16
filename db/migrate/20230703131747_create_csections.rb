class CreateCsections < ActiveRecord::Migration[6.1]
  def change
    create_table :csections do |t|
      t.string :title
      t.string :sub_title
      t.string :body
      t.string :csecctionimg
      t.string :slug

      t.timestamps
    end
    add_index :csections, :slug
  end
end
