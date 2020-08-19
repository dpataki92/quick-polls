class UsersController < ApplicationController

    def logged_in?
        if request.env["Authorization"] === "undefined"
            render json: {message: "no"}
        else
            render json: {message: "yes"}
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session = (0...20).map { (65 + rand(26)).chr }.join
            render json: {message: session}
        else 
            user = User.create(username: params[:username], password: params[:password])
            session = (0...20).map { (65 + rand(26)).chr }.join
            render json: {id: user.id, username: user.username, session: session}
        end
    end

end