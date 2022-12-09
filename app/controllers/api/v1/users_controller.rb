class Api::V1::UsersController < ApplicationController

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

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

    def password=(new_password)
        salt = Bcrypt::Engine.generate_salt
        self.password_digest = BCrypt::Engine.hash_secret(new_password, salt)
    end

    def authenticate(password)
        salt = password_digest[0..28]
        return nil unless BCrypt::Engine.hash_secret(password, salt) == self.password_digest
        self
    end

    private

    def user_params
        params.permit(:uga_my_id, :first_name, :last_name, :password, :password_digest, :password_confirmation)
    end

end
