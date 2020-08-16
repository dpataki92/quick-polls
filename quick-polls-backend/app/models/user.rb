class User < ApplicationRecord 
    has_secure_password

    has_and_belongs_to_many :friends,
                          :class_name => "User",
                          :join_table => "users_friends",
                          :foreign_key => "user_id",
                          :association_foreign_key => "friend_id"

    has_many :polls, through: :users_polls

    has_many :votes, through: :polls, foreign_key: :user_id, class_name: "Option" 

    validates :username, presence: true
end