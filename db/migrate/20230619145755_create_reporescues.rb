class CreateReporescues < ActiveRecord::Migration[6.1]
  def change
    create_table :reporescues do |t|
      t.string :v_debt
      t.datetime :repo_time
      t.string :repo_plan
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
      t.string :vrepoimg

      t.timestamps
    end
    add_index :reporescues, :slug
  end
end
