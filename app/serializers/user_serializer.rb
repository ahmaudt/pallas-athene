class UserSerializer < ActiveModel::Serializer
  attributes :id, :uga_my_id, :password_digest
end
