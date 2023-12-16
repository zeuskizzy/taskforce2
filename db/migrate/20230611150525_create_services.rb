class CreateServices < ActiveRecord::Migration[6.1]
  def change
    create_table :services do |t|
      t.string :title
      t.string :slug
      t.string :icon
      t.string :sub_title
      t.text :body
      t.string :serviceimg

      t.timestamps
    end
    add_index :services, :slug
  end
end
