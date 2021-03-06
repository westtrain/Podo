#!/bin/bash
cd /home/ubuntu/podo/server

#DATABASE_USERNAME fixed typo
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')

export PORT=$(aws ssm get-parameters --region ap-northeast-2 --names PORT --query Parameters[0].Value | sed 's/"//g')

export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export NAVER_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export NAVER_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export NAVER_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export CLIENT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_URI --query Parameters[0].Value | sed 's/"//g')
export CLIENT_LOGIN_CALLBACK=$(aws ssm get-parameters --region ap-northeast-2 --names CLIENT_LOGIN_CALLBACK --query Parameters[0].Value | sed 's/"//g')


export IMPORT_CUSTOMER_UI=$(aws ssm get-parameters --region ap-northeast-2 --names IMPORT_CUSTOMER_UI --query Parameters[0].Value | sed 's/"//g')
export IMPORT_API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names IMPORT_API_KEY --query Parameters[0].Value | sed 's/"//g')
export IMPORT_API_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names IMPORT_API_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js
