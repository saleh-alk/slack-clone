json.array!(@users) do |user|
    # json.set! user.id do
    #     json.partial! 'user', user: user
    # end
  json.extract! user, :id, :username, :email, :created_at
end

# json.user do
#   json.extract! @users, :id, :email, :username, :created_at, :updated_at
# end