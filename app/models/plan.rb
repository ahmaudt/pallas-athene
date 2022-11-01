class Plan < ApplicationRecord
  belongs_to :student
  serialize :data, JsonbSerializer

  PLAN_DATA_SCHEME = Rails.root.join('app', 'models', 'schemas', 'plan.json')
  validates :data, presence: true, json: { message: -> (err) { err }, schema: PLAN_DATA_SCHEME }
end
