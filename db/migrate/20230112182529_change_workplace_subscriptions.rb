class ChangeWorkplaceSubscriptions < ActiveRecord::Migration[7.0]
  def change
    add_index :workplace_subscriptions, [:user_id, :workplace_id], unique: true
  end
end
