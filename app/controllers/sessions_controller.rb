class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create
    def create
        user = User.find_by(uga_my_id: params[:uga_my_id])
        if user&.authenticate(params[:password_digest])
            session[:user_id] = user.id
            render json: user
        else
            render json: { error: "Invalid username and/or password" }, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content
    end

end