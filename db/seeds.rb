# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
  # puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Workplace.destroy_all
  Channel.destroy_all
  WorkplaceSubscription.destroy_all
  # puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('workplaces')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  ApplicationRecord.connection.reset_pk_sequence!('workplace_subscriptions')
  
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )
   User.create!({
      username: "demo2",
      email: "demo2@user.io",
      password: 'password'
  
    })

    # Workplace.create!({
    #   name: Faker::Internet.unique.username(specifier: 3),
    #   url: Faker::Internet.unique.email,
    #   admin_id: 1
    # })

  



  # More users
  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   })
  #   end
  # Workplaces
  #   10.times do 
  #   Workplace.create!({
  #     name: Faker::Internet.unique.username(specifier: 3),
  #     url: Faker::Internet.unique.email,
  #     admin_id: rand(1..10)
  #   }) 
  # end


  # 10.times do 
  #   WorkplaceSubscription.create!({
  #     user_id: rand(1..10),
  #     workplace_id: rand(1...10)
  #   }) 
  # end

  #   10.times do 
  #   Channel.create!({
  #     owner_id: rand(1..10),
  #     name: Faker::Internet.unique.username(specifier: 3),
  #     private: true,
  #     workplace_id: rand(1..3)
  #   }) 

    
   

  # end

    #  WorkplaceSubscription.create!({
    #   user_id: 1,
    #   workplace_id: 1
    # }) 

    #  WorkplaceSubscription.create!({
    #   user_id: 2,
    #   workplace_id: 1
    # }) 



 
end