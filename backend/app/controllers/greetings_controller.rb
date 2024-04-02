class GreetingsController < ApplicationController
  def hello
    render json: { content: "🟢 Live "  }
  end
end
