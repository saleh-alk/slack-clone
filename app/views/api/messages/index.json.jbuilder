json.array!(@messages) do |message|
    # json.set! message.id do
    #     json.partial! 'message', message: message
    # end
  json.extract! message, :user_id, :channel_id, :body, :created_at
  json.user message.user.username
end