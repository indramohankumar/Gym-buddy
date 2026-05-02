# Goal Description

The goal is to complete the authentication and authorization implementation in the "Gym-buddy" application. This includes protecting React routes so unauthenticated users cannot access the home page, associating workouts with specific users in the backend database, and ensuring all API requests from the frontend include the necessary authorization headers.

## User Review Required

> [!IMPORTANT]
> The changes will clear any existing workouts that were created without a `user_id` from being accessible to normal users, as workouts will now strictly be tied to individual accounts. If you have legacy data, it may need to be updated manually or it won't show up. Let me know if this is an issue.

## Open Questions

None currently. The plan follows standard MERN stack authentication patterns.

## Proposed Changes

### Backend - Workouts Model and Controller

#### [MODIFY] [workoutmodel.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/backend/models/workoutmodel.js)
- Add a `user_id` field to the `workoutSchema` (type: String, required: true). This ensures every workout is tied to a user.

#### [MODIFY] [workoutController.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/backend/controllers/workoutController.js)
- In `getworkouts`, filter the `workout.find({ user_id: req.user._id })` so users only see their own workouts.
- In `createworkout`, extract `req.user._id` and include it when calling `workout.create(...)`.

---

### Frontend - React Routes Protection

#### [MODIFY] [App.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/frontend/src/App.js)
- Import `Navigate` from `react-router-dom` and `useAuthContext` from hooks.
- Protect the `/` route: render `<Home/>` if `user` exists, else `<Navigate to="/login" />`.
- Protect the `/login` and `/signup` routes: render `<Login/>` / `<Signup/>` if no `user`, else `<Navigate to="/" />`.

---

### Frontend - API Authorization Headers

#### [MODIFY] [home.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/frontend/src/pages/home.js)
- Use `useAuthContext` to get the `user` object.
- Add an `Authorization` header (`Bearer ${user.token}`) to the `fetch` request for fetching workouts.
- Add a check to only fetch workouts if `user` is present.

#### [MODIFY] [workoutfrom.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/frontend/src/components/workoutfrom.js)
- Use `useAuthContext` to get the `user`.
- Add an `Authorization` header to the `POST` request.
- Add an early return/error if the user submits the form without being logged in.

#### [MODIFY] [workoutdetails.js](file:///c:/Users/devia/OneDrive/Desktop/fullstack%201/frontend/src/components/workoutdetails.js)
- Use `useAuthContext` to get the `user`.
- Add an `Authorization` header to the `DELETE` request.

## Verification Plan

### Automated/Manual Verification
- Try to access the home page (`/`) without logging in; it should redirect to `/login`.
- Log in and verify that the home page displays only the workouts assigned to that user.
- Add a new workout and verify it succeeds and displays.
- Delete a workout and verify it is removed correctly.
- Try to access `/login` while logged in; it should redirect to `/`.
