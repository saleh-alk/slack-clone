# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password

   validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  
  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.update!(session_token: generate_unique_session_token)
    self.session_token
  end

    has_many :workplaces,
    foreign_key: :admin_id,
    class_name: :Workplace,
    dependent: :destroy,
    inverse_of: :admin

    has_many :workplace_subscriptions,
    foreign_key: :user_id,
    class_name: :WorkplaceSubscription,
    dependent: :destroy

    has_many :subscribed_workplaces,
    through: :workplace_subscriptions,
    source: :workplace

    has_many :channels,
    foreign_key: :owner_id,
    class_name: :Channel,
    dependent: :destroy,
    inverse_of: :owner

    has_many :messages,
    foreign_key: :user_id,
    class_name: :Message,
    dependent: :destroy

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64
      break token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
