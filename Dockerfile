FROM ghcr.io/container-projects/base-docker-images:node-12-npm-yo-latest
USER root
RUN  mkdir /code/
COPY . /code/.
RUN npm i -g /code/.
RUN \
  # configure the "yo" user
  groupadd yo && \
  useradd yo -s /bin/bash -m -g yo -G sudo && \
  echo yo:yo |chpasswd 
RUN mkdir /home/yo/app
USER yo
ENV PATH $PATH:/usr/bin
WORKDIR "/home/yo/app"
VOLUME ["/home/yo/app"]
CMD ["yo"]