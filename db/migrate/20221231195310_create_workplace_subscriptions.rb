class CreateWorkplaceSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :workplace_subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :workplace, null: false, foreign_key: true
      t.timestamps
    end
  end
end
