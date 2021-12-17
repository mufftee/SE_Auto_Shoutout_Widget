let fieldData = "";
let jwt = "";
let channelId = "";
let usernames = [];
const date = new Date();
const [month, day, year] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
];

function sendMessage(id, token, messageContent) {
  fetch(`https://api.streamelements.com/kappa/v2/bot/${id}/say`, {
    method: "POST",
    headers: {
      Accept: "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: messageContent }),
  })
    .then(function (res) {})
    .catch(function (res, err) {});
}

window.addEventListener("onWidgetLoad", function (obj) {
  channelId = obj.detail.channel.id;

  fieldData = obj.detail.fieldData;
  jwt = fieldData.token;
  usernames = fieldData.usernames.toLowerCase().split(",");

  SE_API.store.set(`${day}${month}${year}`, {
    userShoutoutet: [],
  });

  async function getKey() {
    let key = {};

    await SE_API.store.get(`${day}${month}${year}`).then((obj) => {
      key = obj;
    });

    if (key === null) {
      SE_API.store.set(`${day}${month}${year}`, {
        userShoutoutet: [],
      });
    } else {
      return;
    }
  }

  getKey();
});

window.addEventListener("onEventReceived", function (obj) {
  const eventData = obj.detail.event.data;
  const usernameInList = usernames.find((user) => user === eventData.nick);
  console.log(eventData);

  if (eventData.nick !== "streamelements" && usernameInList) {
    SE_API.store.get(`${day}${month}${year}`).then((obj) => {
      const storeData = obj;
      const shoutouts = storeData.userShoutoutet;
      const didShoutoutUser = shoutouts.find(
        (user) => user.nick === eventData.nick
      );

      for (const username of usernames) {
        if (eventData.nick === username) {
          if (!didShoutoutUser) {
            let shoutoutMessage = fieldData.message;
            shoutoutMessage = shoutoutMessage.replace(
              "{{user}}",
              `@${eventData.nick}`
            );
            shoutoutMessage = shoutoutMessage.replace(
              "{{url}}",
              `https://www.twitch.tv/${eventData.nick}`
            );
            sendMessage(channelId, jwt, shoutoutMessage);

            shoutouts.push({
              nick: eventData.nick,
              text: eventData.text,
            });

            SE_API.store.set(`${day}${month}${year}`, {
              userShoutoutet: shoutouts,
            });
          }
        }
      }

      return;
    });
  } else {
    return;
  }
});
