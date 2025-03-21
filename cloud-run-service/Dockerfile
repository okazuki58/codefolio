FROM node:18

# Gitのインストール
RUN apt-get update && apt-get install -y git

# アプリケーションディレクトリの作成
WORKDIR /app

# アプリケーションの依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# サービスポートの公開
EXPOSE 8080

# サービスの起動
CMD [ "node", "server.js" ] 