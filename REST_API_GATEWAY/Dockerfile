# A konténerünkön futó Node.js verziója
FROM node:18

# Az alkalmazásunk forráskódjának elérési útja a konténerben
WORKDIR /app

# Az alkalmazásunk függőségei, a package.json alapján
COPY package*.json ./

# Az alkalmazásunk függőségeinek telepítése
RUN npm install

# Az alkalmazásunk forráskódjának másolása a konténerbe
COPY . .

# A port, amin az alkalmazásunk hallgatni fog
EXPOSE 5000

# Az alkalmazásunk futtatása
CMD [ "node", "index.js" ]