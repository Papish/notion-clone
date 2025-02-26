# Authentication

1. Instead of using component like PrivateRoute to protect pages. You can also create a HOC function

```
const ProfilePage = () => <div>Profile Page</div>

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />,
});
```

2. Use cookie to store active session user data instead of local/session storage for better security
