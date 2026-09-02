# Web Server Development

## Authorization Rules

_Public Endpoints_ - Can be accessed without authentication:

- `POST /api/v1/auth/login`
- `POST /api/v1/users`
- `GET /api/v1/cats`
- `GET /api/v1/cats/:id`

_Protected Endpoints_ - Requires `Bearer <token>` in headers:

- `GET /api/v1/auth/me` - Returns logged-in user data
- `POST /api/v1/cats` - Upload cat (sets owner to authenticated user)
- `PUT /api/v1/cats/:id` & `DELETE /api/v1/cats/:id` - Normal users can only edit/delete their own cats; admins can edit/delete any cat
- `PUT /api/v1/users/:id` & `DELETE /api/v1/users/:id` - Normal users can only edit/delete their own profile; admins can edit/delete any user
