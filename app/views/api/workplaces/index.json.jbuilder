json.array!(@workplaces) do |workplace|
    # json.set! workplace.id do
    #     json.partial! 'workplace', workplace: workplace
    # end
  json.extract! workplace, :id, :name, :url, :admin_id
  
end