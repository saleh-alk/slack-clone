# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  owner_id     :bigint           not null
#  name         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  private      :boolean          not null
#  workplace_id :bigint           not null
#
class Channel < ApplicationRecord
    validates :name, :private, presence: true


    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

    belongs_to :workplace

    has_many :messages,
    foreign_key: :channel_id,
    class_name: :Message,
    dependent: :destroy
end
