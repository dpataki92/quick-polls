Rails.application.routes.draw do
  resources :users, only: [:index]
  get "/users/logged_in", to: "users#logged_in?"
  resources :polls, only: [:index, :new, :create]
  get "/polls/closed", to: "polls#closed"
end
