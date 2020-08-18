Rails.application.routes.draw do
  resources :users, only: [:index, :create]
  get "/users/logged_in", to: "users#logged_in?"
  post "/users/logout", to: "users#logout"
  resources :polls, only: [:index, :new, :create]
  get "/polls/closed", to: "polls#closed"
  get "/polls/check", to: "polls#check"
end
