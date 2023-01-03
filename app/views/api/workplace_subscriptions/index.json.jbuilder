json.array!(@subscriptions) do |subscription|
    # json.set! workplace.id do
    #     json.partial! 'workplace', workplace: workplace
    # end
  json.extract! subscription, :user_id, :workplace_id
end


