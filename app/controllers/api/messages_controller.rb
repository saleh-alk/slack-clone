class Api::MessagesController < ApplicationController
     before_action :require_logged_in, except: [:index, :create]


  def index
    @messages = Message.all 
    @message= Message.new
    render :index
  
  end

  def create
    @message = Message.new(message_params)
  
    if @message.save
      # Your code here
      # render :show , locals: { message: @message }
      ChannelsChannel.broadcast_to @message.channel,
        from_template('api/messages/show', message: @message)
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    # Your code here
    render json: nil, status: :ok
  end

  private

  def message_params
    params.require(:message).permit(:user_id, :channel_id, :body, :private)
  end
end
