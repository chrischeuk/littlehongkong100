class GreetingsController < ApplicationController
  def hello
    render json: { content: "Hello from rails"  }
  end
end
