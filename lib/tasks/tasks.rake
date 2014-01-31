namespace :jobs do

	desc "Import tasks"
	task :stream => :environment do
		client = Twitter::Streaming::Client.new do |config|
			config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
			config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
			config.access_token        = ENV["ACCESS_TOKEN"]
			config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
		end
		client.user do |object|
			case object
			when Twitter::Tweet
				@tweet = Tweet.create(text: object.text)
			end
		end
	end
end
