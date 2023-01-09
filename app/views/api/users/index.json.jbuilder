json.array!(@users) do |user|
    # json.set! user.id do
    #     json.partial! 'user', user: user
    # end
  json.extract! user, :id, :username, :email, :created_at
end