# GAINS API
This application allows you to register, login and get film data and also comment on film data.

# STEPS TO RUN APP
### Step 1: Start up the containers
RUN `docker-compose up -d ` 

RUN `docker container exec -it gain-task-api npm run typeorm:run`


## STEPS TO RUN LOCALLY

RUN - `npm i`

RUN `cp .env.example .env`

ADD database credentails and redis credentials


NOTE: ACTIVE_MAIL_SENDER = consoler

You can change it to mailtrap if you have a mailtrap credentials


### App Features
- Create a user account
- Add and Email and Verify Email
- Confirm Email
- Login a user via userName and Password
- Login via email 
- Get Users Email with query inactive or active
- Delete Email

#### Logs can be seen on the console

#### POSTMAN API Documentation.
[Postman Api documentation](https://documenter.getpostman.com/view/6226738/UV5UidcX)
