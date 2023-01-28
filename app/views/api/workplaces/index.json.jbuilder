json.array!(@workplaces) do |workplace|
    # json.set! workplace.id do
    #     json.partial! 'workplace', workplace: workplace
    # end
  json.extract! workplace, :id, :name, :url, :admin_id
  # json.first_channel workplace.channels.first.id
  
end