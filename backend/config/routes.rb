Rails.application.routes.draw do
  namespace :admin do
      resources :items
      resources :lease_records

      root to: "items#index"
    end
  get 'greetings/hello'
  namespace :api do
    namespace :v1 do 
      get 'items/index', to: 'items#index', :defaults => {:format => "json"}
      get 'items/show', to: 'items#show', :defaults => {:format => "json"}
      
      
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
