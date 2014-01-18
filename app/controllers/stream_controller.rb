class 
	StreamController < ApplicationController
	respond_to :json

	def index
		@tweets = Tweet.all
		render :json => @tweets
	end
end