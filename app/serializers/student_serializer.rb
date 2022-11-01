class StudentSerializer < ActiveModel::Serializer
  attributes :id, :data
  has_one :user
end
