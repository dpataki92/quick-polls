class UsersController < ApplicationController

    def logged_in?
        if true
            render json: {message: "yes"}
        else
            render json: {message: "yes"}
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session = UsersController.session=((0...16).map { (65 + rand(26)).chr }.join)
            render json: {message: session}
        else 
            user = User.create(username: params[:username], password: params[:password])
            session = UsersController.session=((0...16).map { (65 + rand(26)).chr }.join)
            render json: {id: user.id, username: user.username}
        end
    end

end