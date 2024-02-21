Rails.application.routes.draw do
  namespace :admin do
      resources :items
      resources :lease_records

      root to: "items#index"
    end
  get 'greetings/hello'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
