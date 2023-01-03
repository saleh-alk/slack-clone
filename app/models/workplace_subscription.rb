# == Schema Information
#
# Table name: workplace_subscriptions
#
#  id           :bigint           not null, primary key
#  user_id      :bigint           not null
#  workplace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class WorkplaceSubscription < ApplicationRecord

    belongs_to :user

    belongs_to :workplace
end
