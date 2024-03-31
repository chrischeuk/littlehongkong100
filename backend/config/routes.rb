Rails.application.routes.draw do
  namespace :admin do
      resources :items
      resources :lease_records
      resources :products
      resources :brands

      root to: "items#index"
    end
  get 'greetings/hello'
  namespace :api do
    namespace :v1 do 
      get 'items/index', to: 'items#index', :defaults => {:format => "json"}
      get 'items/show_items', to: 'items#show_items', :defaults => {:format => "json"}
      get 'items/show_item/:id', to: 'items#show_item', :defaults => {:format => "json"}
      get 'products/show_products', to: 'products#show_products', :defaults => {:format => "json"}
      
      
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
