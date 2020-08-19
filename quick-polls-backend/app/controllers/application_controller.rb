class ApplicationController < ActionController::API
    def current_user(header)
        User.find_by(token: header)
    end
end
