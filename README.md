### How does this work?

since we're working with the SE Database we need to use the JWT Token. Without the JWT Token you're not able write and read data from the database and also cant perfom PUT Request to the Bot in your Channel.

### Getting Started
- Make sure the Streamelements Bot exist in your Channel
- Make sure the Streamelements Bots has Mod
- Create a new Custom Widget inside of an Overlay
- Paste in the code from the `index.js` inside the Tab `JS` and `fields.json` inside the Tab `Fields`
- Click Save

After the Save you should see now the Fields on the right for the JWT Token, Usernames and also the Message.

- Paste in the JWT Token.

> **WARNING**: JWT are able to change everything in your Channel with the API, so dont share them with others!

### Last step
- setup the Usernamens as a list with `username,username,username` etc.
- setup your message with text, `{{user}} and {{url}}`. You can place `{{user}} and {{url}}` inside your text where ever you want it to be. With `{{user}} and {{url}}` will be generated a `@username` annotation and also the link to the user on twitch.


### How often will the message be sended?
- The Auto-Shoutout will be sended once per day.