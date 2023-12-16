class CreateBoards < ActiveRecord::Migration[6.1]
  def change
    create_table :boards do |t|
      t.string :title
      t.string :name
      t.text :body
      t.string :boardimg
      t.string :slug

      t.timestamps
    end
    add_index :boards, :slug
  end
end
