# Step-by-step guide for install and run the bot locally
### Created using [deepaiAPI](https://deepai.org/machine-learning-model/text2img)
## 1. Clone this repository
```
git clone https://github.com/kirofint/text_to_picture_bot
```
## 2. Launch [mongo db](https://www.mongodb.com/)
## 3. Create `.env` and fill in your `environment variables`
## 4. Run the command to install yarn packages
```
yarn install
```
## 5. Finally run
```
yarn serve
```

# Environment variables

- `ADMIN_ID` — Your telegram id. You may get it, with `ctx.from` command
- `TOKEN` — Telegram bot token
- `MONGO` — URL of the mongo database
- `API_KEY` — you might get it [here](https://deepai.org/machine-learning-model/text2img)
