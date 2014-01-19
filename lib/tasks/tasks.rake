namespace :jobs do

	desc "Import tasks"
	task :stream => :environment do
		client = Twitter::Streaming::Client.new do |config|
			config.consumer_key        = "4t0MacKE7dkcAGh9Xjp9xw"
			config.consumer_secret     = "gIIUu4gkLQa6CEk5EBztnyNUo0CG6S4V6uEUGCcdJM"
			config.access_token        = "2296781316-UYMnmZqyEMwEIRAaWjv7lNPsUPkOeRdmVumvfmX"
			config.access_token_secret = "d7V7Z0A9tu5wTUI8wMqJmGs1tX8qMU1uMr314VedpjZZ4"
		end
		client.user do |object|
			case object
			when Twitter::Tweet
				@tweet = Tweet.create(text: object.text)
				@song_name = 
				rdio = Rdio.new(['62k6xnjstf92y6zcmfqd5ajj', 'ZY5XxvFXqe'])
				@search = rdio.call('search', {query: params[:query], types:'Track'})['result']['results']
				@song = 
			end
		end
	end
end
