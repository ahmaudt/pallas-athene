class Student < ApplicationRecord
  belongs_to :user
  serialize :data, JsonbSerializer
  store_accessor :data, :uga_my_id, :first_name, :last_name, :matriculation_term, :graduation_term, :majors, :minors, :certificates

  STUDENT_DATA_SCHEMA = Rails.root.join('app', 'models', 'schemas', 'student.json')
  validates :data, presence: true, json: { message: -> (err) { err }, schema: STUDENT_DATA_SCHEMA }

end
