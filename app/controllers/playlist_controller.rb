class PlaylistController < ApplicationController
	before_filter :find_model

	

	private
	def find_model
		@model = Playlist.find(params[:id]) if params[:id]
	end
end