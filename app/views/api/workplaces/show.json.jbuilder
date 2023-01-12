json.workplace do
  json.extract! @workplace, :id, :name, :url, :admin_id
  json.first_channel @workplace.channels.first.id
end