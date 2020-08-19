class PollsController < ApplicationController
    def index
        polls = current_user(request.env["HTTP_AUTHORIZATION"]).polls.recent.pending_polls
        render json: PollSerializer.new(polls).to_serialized_json
    end

end
