class Option < ApplicationRecord 

    belongs_to :poll
    has_many :users, through: :polls

    validates :description, presence: true
end