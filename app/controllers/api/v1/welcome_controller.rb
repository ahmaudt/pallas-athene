class Api::V1::WelcomeController < ApplicationController
  def index
    render json: { status: 200, message: "Welcome to the UGA Advising API" }
  end
end