# == Schema Information
#
# Table name: messages
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  channel_id  :bigint           not null
#  description :text             not null
#  private     :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Message < ApplicationRecord
    validates :body, :private, presence: true

    belongs_to :channel,
    foreign_key: :channel_id,
    class_name: :Channel

    belongs_to :user

end
