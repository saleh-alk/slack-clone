# == Schema Information
#
# Table name: workplaces
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  url        :string           not null
#  admin_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Workplace < ApplicationRecord
        validates :name, length: { in: 3..30 }
        validates :url, length: { in: 3..50 }


        belongs_to :admin,
        foreign_key: :admin_id,
        class_name: :User

        has_many :workplace_subscriptions,
        foreign_key: :workplace_id,
        class_name: :WorkplaceSubscription,
        dependent: :destroy



       
end
