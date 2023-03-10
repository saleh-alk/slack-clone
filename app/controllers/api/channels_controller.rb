class Api::ChannelsController < ApplicationController
    #  before_action :require_logged_in, except: [:index]

  def index

    @workplace = Workplace.find_by(id: params[:workplace_id])
    @channels = @workplace.channels
    # @channels = Channel.includes(:owner).all
    render :index
  end

  def show
    @channel = Channel.find(params[:id])
    render :show, locals: { channel: @channel, current_user: current_user}
    # Your code here
  end

  def create
    @channel = Channel.new(channel_params)

    if @channel.save!
      render '_channel', locals: { channel: @channel }
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def update
    @channel = Channel.find(params[:id])

    if(@channel.update(channel_params))
      render :show
    else
      render json: { errors: @channel.errors.full_messages }, status: 422
    end
  end

  def destroy
    @channel = Channel.find_by(id: params[:id])
    @channel.destroy
    # Your code here
    render json: nil, status: :ok
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :private, :owner_id, :workplace_id)
  end
end
