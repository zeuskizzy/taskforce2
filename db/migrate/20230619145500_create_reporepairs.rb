class CreateReporepairs < ActiveRecord::Migration[6.1]
  def change
    create_table :reporepairs do |t|
      t.string :v_name
      t.string :v_type
      t.string :v_info
      t.string :v_model
      t.boolean :status
      t.references :user, null: false, foreign_key: true
      t.string :slug
      t.string :pk_address
      t.string :d_address
      t.string :phone
      t.string :vimg

      t.timestamps
    end
    add_index :reporepairs, :slug
  end
end
