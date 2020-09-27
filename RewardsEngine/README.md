# Rewards and Loyalty service

This is the Rewards mock service

The objective of this ms is to provide basic rewards and loyalty functionalities
It focuses only on loyalty related functionalities and flow
hence it lacks auth or security related concerns.

## Endpoints

### Get or create user

> POST /users

**body**
```json
{
	"username": "vin",
	"password": "vin",
	"documentNumber": "1232string",
	"profilePicture": "http://img.jpeg"
}
```

### Share shots

> POST /loyalty/{username}/shots/share?{feed_id=dsdsdad&creator=vinay}

**body**
```json
{
	"shareLink": "http://sharebel"
}
```

### view reward points

> GET /loyalty/{username}/points

### cmr subscribe reward

> GET /loyalty/{username}/cmr/subscribe

### quiz answer reward

> GET /loyalty/{username}/quiz/answer

### Scripts

To view the list of scripts

```console
$ npm run
```

##Techstack
* mongodb
* nodejs
* fastify
* docker



