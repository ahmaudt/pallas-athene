class CoreCurriculum < ApplicationRecord
    serialize :data, JsonbSerializer
    store_accessor :data, :core_area, :course_code, :credit_hrs

    CORE_CURRICULUM_SCHEMA = Rails.root.join('app', 'models', 'schemas', 'core_curriculum.json')
    validates :data, presence: true, json: { message: -> (err) { err }, schema: CORE_CURRICULUM_SCHEMA }
    
end
