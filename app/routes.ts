import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    // Defines the new dynamic route for displaying a specific resume review
    route('/resume/:id', 'routes/resume.tsx'),

] satisfies RouteConfig;