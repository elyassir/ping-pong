FROM node
WORKDIR /app
COPY . /app
RUN npm i
RUN chmod +x starter.sh
EXPOSE 4000 5555
ENTRYPOINT ["bash", "./starter.sh"]