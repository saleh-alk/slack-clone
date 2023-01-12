# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_12_182529) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "private", null: false
    t.bigint "workplace_id", null: false
    t.index ["owner_id"], name: "index_channels_on_owner_id"
    t.index ["workplace_id"], name: "index_channels_on_workplace_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "channel_id", null: false
    t.text "body", null: false
    t.boolean "private", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "workplace_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workplace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "workplace_id"], name: "index_workplace_subscriptions_on_user_id_and_workplace_id", unique: true
    t.index ["user_id"], name: "index_workplace_subscriptions_on_user_id"
    t.index ["workplace_id"], name: "index_workplace_subscriptions_on_workplace_id"
  end

  create_table "workplaces", force: :cascade do |t|
    t.string "name", null: false
    t.string "url", null: false
    t.bigint "admin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_workplaces_on_admin_id"
  end

  add_foreign_key "channels", "users", column: "owner_id"
  add_foreign_key "channels", "workplaces"
  add_foreign_key "messages", "channels"
  add_foreign_key "messages", "users"
  add_foreign_key "workplace_subscriptions", "users"
  add_foreign_key "workplace_subscriptions", "workplaces"
  add_foreign_key "workplaces", "users", column: "admin_id"
end
