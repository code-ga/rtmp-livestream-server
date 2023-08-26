FROM tiangolo/nginx-rtmp

COPY ./web /www/

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
COPY rtmp.nginx /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/rtmp.nginx /etc/nginx/sites-enabled/rtmp.nginx

RUN rm -r /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/nginx.conf
