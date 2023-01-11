  json.extract! message, 
    :id, 
    :body, 
    :user_id, 
    :channel_id, 
    :created_at

  json.user message.user.username