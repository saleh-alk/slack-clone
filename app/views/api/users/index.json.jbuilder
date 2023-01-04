json.user do
  json.extract! @user, :id, :email, :username, :workplaces, :created_at, :updated_at
end