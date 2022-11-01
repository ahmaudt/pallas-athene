class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.jsonb :data, null: false, default: {}
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
