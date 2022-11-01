class CreatePlans < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.belongs_to :student, null: false, foreign_key: true
      t.jsonb :data

      t.timestamps
    end
  end
end
