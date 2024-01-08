# README

# About the Project
A clone project of slack. Uses Action Cable to broadcast messages. Allows users working in the same workplace to communicate with each other via action cable.

# Link to live site
https://khakis-igty.onrender.com

# Features
One feature I that was new to me was using action cable to the messenger app. Implementing that was difficult at first, but after understanding how to access the methods from the backend I felt like it was simpler to know how to access the database. I also learned how to broadcast the messages so that the messages show without refreshing.

Another challenge I faced was creating and deleting the channels. I had issues trying to add the channel in to the database and to get a new workplace to create a general channel, but learned that the best way to do it it from the backend so that everytime it creates a new workplace it creates a general channel.

# Technologies

For my message model I implemented action cables to broadcast the it's' data, so whenever the user sends a message, it displays the body of the message without having to refresh from both sides. I also used redis to host websockets on the live server. I used rails for the backend and React.js for the frontend.

# Future Features

Add direct messages to send private messages to a certain user. Group messaging, so people only within that group can
see those messages.
