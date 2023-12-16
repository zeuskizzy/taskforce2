class CreatePlans < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.string :amount
      t.string :name
      t.string :referal
      t.string :duration
      t.string :plan
      t.string :plan_name
      t.string :mini
      t.string :maxi
      t.string :body

      t.timestamps
    end
  end
end
