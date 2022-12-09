class User < ApplicationRecord
    has_many :students
    has_many :plans, through: :students
    validates :uga_my_id, presence: true, uniqueness: true
    has_secure_password

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else
            render json: {
                error: "Not authorized"
            },
            status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    def password=(new_password)
        salt = BCrypt::Engine.generate_salt
        self.password_digest = BCrypt::Engine.hash_secret(new_password, salt)
    end

    def authenticate(password)
        salt = password_digest[0..28]
        return nil unless BCrypt::Engine.hash_secret(password, salt) === self.password_digest
        self
    end

end
