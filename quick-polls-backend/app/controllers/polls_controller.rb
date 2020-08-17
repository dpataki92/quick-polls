class PollsController < ApplicationController
    def index
        polls = Poll.all
        render json: PollSerializer.new(polls).to_serialized_json
    end
end
