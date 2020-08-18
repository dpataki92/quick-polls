class PollsController < ApplicationController
    def index
        polls = Poll.recent.pending_polls
        render json: PollSerializer.new(polls).to_serialized_json
    end

    def check
        render json: {message: session[:user_id]}
    end
end
