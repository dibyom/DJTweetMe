class SearchController < ApplicationController

	def index
		require 'rdio'		
		rdio = Rdio.new(['62k6xnjstf92y6zcmfqd5ajj', 'ZY5XxvFXqe'], 
                    ['5fxyvarsbr87dr3xs8u8x3wf', 'VGSHB9jm7MhG'])
		@search = rdio.call('search', {query: 'Dark Horse', types:'Track'})['result']['results']

		render :json => @tweets
	end
	

end