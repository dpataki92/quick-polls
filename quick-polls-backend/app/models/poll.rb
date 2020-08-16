class Poll < ApplicationRecord 

    has_many :user_polls
    has_many :users, through: :user_polls

    has_many :options

    validates :question, presence: true
    validates :status, inclusion: { in: %w(pending closed)}
end