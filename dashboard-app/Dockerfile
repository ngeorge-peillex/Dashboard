FROM node:current-alpine

# Create React app dir
RUN mkdir /react
WORKDIR /react

# Install dependencies before pushing the rest of the code in order to use
# cached dependencies when a file other than the package.json is changed in
# the current host directory
COPY ./package.json ./
RUN npm install

# Copy code ressources
COPY . .

RUN npm run build

CMD ["npm", "start"]
