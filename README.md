# nomeetus
Electron calendar app

It is lunching from menubar

<img src=http://i.imgur.com/j0Xn41R.gif width=300px/>


## Usage

Before you can start using the app, you need to have Google OAuth client credentials for Google Calendar API:

1. Create a project [here](https://console.developers.google.com/cloud-resource-manager)
2. Go to the API Manager and enable the `Calendar API`
3. [Create Credentials > OAuth Client Id](https://console.developers.google.com/apis/credentials) and choose "Other" as the application type

Download `client_secret.json`. It will look like this:

```
{
  "installed": {
    "client_id": "<your client_id>",
    "project_id": "<your project_id>",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "<your client_secret>",
    "redirect_uris": [
      "urn:ietf:wg:oauth:2.0:oob",
      "http://localhost"
    ]
  }
}
```

Google Calendar API Quotas: 
* 1,000,000 requests per day
* 500 requests per 100 seconds per user


## Thanks to

[GitHub Electron](http://electron.atom.io/) and [menubar](https://github.com/maxogden/menubar)

## License

MIT © [Filip Vitas](https://github.com/felix557700)
