class GreetingsController < ApplicationController
  def hello
    render json: { content: "Hellow from rails"  }
  end
end
