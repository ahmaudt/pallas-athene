class CreateCoreCurriculums < ActiveRecord::Migration[6.1]
  def change
    create_table :core_curriculums do |t|
      t.jsonb :data, null: false, default: {}

      t.timestamps
    end
  end
end
