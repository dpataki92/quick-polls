Rails.application.routes.draw do
  resources :users, only: [:index]
  resources :polls, only: [:index, :new, :create]
  get "/polls/closed", to: "polls#closed"
end
