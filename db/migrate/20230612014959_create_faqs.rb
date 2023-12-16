class CreateFaqs < ActiveRecord::Migration[6.1]
  def change
    create_table :faqs do |t|
      t.string :title
      t.string :sub_title
      t.string :body
      t.string :slug

      t.timestamps
    end
    add_index :faqs, :slug
  end
end
