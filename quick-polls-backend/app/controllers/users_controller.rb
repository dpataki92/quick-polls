class UsersController < ApplicationController

    def logged_in?
        if request.env["HTTP_AUTHORIZATION"] === "undefined"
            render json: {message: "no", token: request.env["HTTP_AUTHORIZATION"]}
        else
            render json: {message: "yes", token: request.env["HTTP_AUTHORIZATION"]}
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user && user.authenticate(params[:password])
            session = (0...20).map { (65 + rand(26)).chr }.join
            render json: {session: session}
        else 
            user = User.create(username: params[:username], password: params[:password])
            session = (0...20).map { (65 + rand(26)).chr }.join
            render json: {id: user.id, username: user.username, session: session}
        end
    end


end