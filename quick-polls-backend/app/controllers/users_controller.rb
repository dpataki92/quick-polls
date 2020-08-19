class UsersController < ApplicationController

    def logged_in?
        if true
            render json: {message: "yes"}
        else
            render json: {message: "no"}
        end
    end

    def create
        user = User.find_by(username: params[:username])
        if user 
            if user.authenticate(params[:password])
                session[:user_id] = user.id
                render json: {id: user.id, username: user.username, session: session[:user_id]}
            else
                render json: {message: "Sorry, this username has already been taken or you used a wrong password :("}
            end
        else 
            user = User.create(user_params)
            session[:user_id] = user.id
            render json: {id: user.id, username: user.username, session: session[:user_id]}
        end
    end

    def logout
        session.reset
        render json: {message: "Logout was successful"}
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end


end