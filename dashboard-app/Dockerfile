FROM node:current-alpine

# Create Prisma Dir
RUN mkdir /prisma
WORKDIR /prisma

# Install dependencies before pushing the rest of the code in order to use
# cached dependencies when a file other than the package.json is changed in
# the current host directory
COPY ./package.json ./
RUN npm install

# Copy code ressources
COPY . .

RUN npm run build

CMD ["npm", "start"]
