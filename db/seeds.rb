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
  # puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('workplaces')
  ApplicationRecord.connection.reset_pk_sequence!('channels')
  
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    })
    end
  # Workplaces
    10.times do 
    Workplace.create!({
      name: Faker::Internet.unique.username(specifier: 3),
      url: Faker::Internet.unique.email,
      admin_id: rand(1..10)
    }) 
  end


  10.times do 
    WorkplaceSubscription.create!({
      user_id: rand(1..10),
      workplace_id: rand(1...10)
    }) 
  end

    10.times do 
    Channel.create!({
      owner_id: rand(1..10),
      name: Faker::Internet.unique.username(specifier: 3),
      private: true
    }) 
  end





 
end