FROM node:20-alpine

WORKDIR /app

# 패키지 먼저 복사해서 설치 (캐시 활용)
COPY package*.json ./
RUN npm install

# 나머지 소스 복사
COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["npm", "run", "start"]
