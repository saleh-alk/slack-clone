json.workplace_subscription do
  # json.extract! @subs[0], :user_id, :workplace_id
  json.array!(@subs) do |sub|
    json.extract! sub, :user_id, :workplace_id
    json.user sub.user

  end
end