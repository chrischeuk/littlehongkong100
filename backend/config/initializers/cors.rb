# in config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins "hhttps://urban-lamp-qr6qg9w6pvcx75j-3000.app.github.dev",
              "https://urban-lamp-qr6qg9w6pvcx75j-5000.app.github.dev",
              "http://yourwebsite.production.app",
              /\Ahttps:\/\/deploy-preview-\d{1,4}--yourwebsite\.domain\.app\z/
  
      resource "*",
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        credentials: true,
        max_age: 86400
    end
  end