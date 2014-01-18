namespace :jobs do

	desc "Import tasks"
	task :stream => :environment do
		client = Twitter::Streaming::Client.new do |config|
			config.consumer_key        = "YOUR_CONSUMER_KEY"
			config.consumer_secret     = "YOUR_CONSUMER_SECRET"
			config.access_token        = "YOUR_ACCESS_TOKEN"
			config.access_token_secret = "YOUR_ACCESS_SECRET"
		end
		client.user do |object|
			case object
			when Twitter::Tweet
				puts object.text
			end
		end
	end
end
