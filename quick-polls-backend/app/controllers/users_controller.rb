class UsersController < ApplicationController
    def logged_in?
        if session[:user_id]
            render json: {message: "yes"}
        else
            render json: {message: "no"}
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            render json: {message: params[:username]}
        else 
            user = User.create(username: params[:username], password: params[:password])
            render json: {id: user.id, username: user.username, password: user.password}
        end
    end
end