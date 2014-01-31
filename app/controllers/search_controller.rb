class SearchController < ApplicationController

	respond_to :json

	def index
		require 'rdio'	

		rdio = Rdio.new([ENV["RDIO KEY"], ENV["RDIO SECRET"]])
		@search = rdio.call('search', {query: params[:query], types:'Track'})['result']['results']
		render :json => @search
	end
	

end
