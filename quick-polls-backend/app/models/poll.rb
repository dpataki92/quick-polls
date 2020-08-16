class Poll < ApplicationRecord 

    has_many :users, through: :users_polls

    has_many :options

    validates :title, presence: true
    validates :status, inclusion: { in: %w(pending closed)
end