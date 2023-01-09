@channels.each do |channel|
  json.channels do
    json.set! channel.id do
      json.partial! 'api/channels/channel', channel: channel
    end
  end

  json.users do
    json.set! channel.owner.id do
      json.partial! 'api/users/user', user: channel.owner
    end
  end
end