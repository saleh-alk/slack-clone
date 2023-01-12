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

        has_many :channels,
        foreign_key: :workplace_id,
        class_name: :Channel,
        dependent: :destroy


        after_save :ensure_general_channel

        def ensure_general_channel
                if(self.channels.length == 0)
                        channel = Channel.create!({owner_id: self.admin_id, name: "general", private: false, workplace_id: self.id })
                        users = User.find_by(id: self.admin_id)
                        subscription = WorkplaceSubscription.create!({user_id: self.admin_id, workplace_id: self.id})
                        
                        self.channels << channel
                end
        end


       
end
