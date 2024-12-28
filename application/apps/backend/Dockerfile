# node
FROM node:22.12.0

# set working directory inside a container
WORKDIR /user/src/app

# copy
COPY package*.json ./

# install
RUN npm install
# copy code
COPY . .

# expose port
EXPOSE 3000
