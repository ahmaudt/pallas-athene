class PlanSerializer < ActiveModel::Serializer
  attributes :id, :data
  has_one :student
end
