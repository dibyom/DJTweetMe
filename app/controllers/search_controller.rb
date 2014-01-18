class SearchController < ApplicationController

	def index
		require 'rdio'		
		rdio = Rdio.new(['62k6xnjstf92y6zcmfqd5ajj', 'ZY5XxvFXqe'])
		@search = rdio.call('search', {query: 'Dark Horse', types:'Track'})['result']['results']

		render :json => @search
	end
	

end