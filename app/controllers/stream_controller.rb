class 
	StreamController < ApplicationController
	respond_to :json

	def index
		@tweets = Tweet.where("id > ?", params[:id])
		render json: @tweets, only: [:text, :id]
		#render :json => @tweets, only: [:id,:name,:city,:state]
	end
end