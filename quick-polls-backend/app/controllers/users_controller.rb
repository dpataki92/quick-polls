class UsersController < ApplicationController
    def logged_in?
        if session[:user_id]
            render json: {message: "yes"}
        else
            render json: {message: "no"}
        end
    end
end