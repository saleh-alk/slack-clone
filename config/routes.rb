Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :workplaces, only: [:index, :create, :update, :show]
    resources :workplace_subscriptions
    resources :channels, only: [:index, :show, :create, :destroy, :update]
    resources :messages, only: [:create, :destroy, :index]

  end
  # post 'api/test', to: 'application#test'
  
  

  mount ActionCable.server => "/cable"

  get "*path", to: "static_pages#frontend"
end
