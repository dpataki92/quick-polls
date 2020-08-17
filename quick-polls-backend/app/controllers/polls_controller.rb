class PollsController < ApplicationController
    def index
        polls = Poll.recent.pending_polls
        render json: PollSerializer.new(polls).to_serialized_json
    end
end
