class CreateSections < ActiveRecord::Migration[6.1]
  def change
    create_table :sections do |t|
      t.string :title
      t.string :icon
      t.string :body
      t.string :sub_title

      t.timestamps
    end
  end
end
